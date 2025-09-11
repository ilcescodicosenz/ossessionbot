import { WAMessageStubType } from '@whiskeysockets/baileys'
import { createCanvas, loadImage, registerFont } from 'canvas'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import fetch from 'node-fetch'
import twemoji from 'twemoji'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const groupBackgroundCache = new Map()
let fontsLoaded = false
const DEFAULT_AVATAR_URL = 'https://i.ibb.co/BKHtdBNp/default-avatar-profile-icon-1280x1280.jpg'

async function setupFonts() {
    if (fontsLoaded) return
    try {
        const fontDir = path.join(__dirname, '..', 'media', 'fonts')
        registerFont(path.join(fontDir, 'BebasNeue-Regular.ttf'), { family: 'Bebas Neue' })
        registerFont(path.join(fontDir, 'Montserrat-Regular.ttf'), { family: 'Montserrat' })
        fontsLoaded = true
    } catch {
        fontsLoaded = true
    }
}

async function drawTextWithEmoji(ctx, text, x, y, font, color = '#fff', align = 'center') {
    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = align

    let parts = []
    let lastIndex = 0
    twemoji.parse(text, {
        callback: (icon, options, variant) => {
            return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${icon}.png`
        },
        ext: '.png'
    }).replace(/<img.*?src="(.*?)".*?alt="(.*?)".*?>/g, (m, src, alt, offset) => {
        if (lastIndex < offset) {
            parts.push({ type: 'text', value: text.slice(lastIndex, offset) })
        }
        parts.push({ type: 'emoji', value: alt, src })
        lastIndex = offset + m.length
        return ''
    })
    if (lastIndex < text.length) {
        parts.push({ type: 'text', value: text.slice(lastIndex) })
    }

    let totalWidth = 0
    let measureFont = font
    for (let part of parts) {
        if (part.type === 'text') {
            totalWidth += ctx.measureText(part.value).width
        } else if (part.type === 'emoji') {
            totalWidth += 70
        }
    }
    let startX = x
    if (align === 'center') startX = x - totalWidth / 2
    if (align === 'right') startX = x - totalWidth

    let drawX = startX
    for (let part of parts) {
        if (part.type === 'text') {
            ctx.fillText(part.value, drawX, y)
            drawX += ctx.measureText(part.value).width
        } else if (part.type === 'emoji') {
            try {
                const emojiImg = await loadImage(part.src)
                ctx.drawImage(emojiImg, drawX, y - 60, 70, 70)
                drawX += 70
            } catch {
                ctx.fillText(part.value, drawX, y)
                drawX += ctx.measureText(part.value).width
            }
        }
    }
}

async function getUserName(conn, jid, pushNameFromStub = '') {
    const isValid = str => str && typeof str === 'string' && str.length > 1 && str.length < 26 && !/^\d+$/.test(str)
    
    // Try pushName from stub first
    if (isValid(pushNameFromStub)) return pushNameFromStub
    
    // Try to get from contact list
    const contact = conn.contacts?.[jid]
    if (contact) {
        if (isValid(contact.notify)) return contact.notify
        if (isValid(contact.name)) return contact.name
        if (isValid(contact.pushName)) return contact.pushName
        if (isValid(contact.verifiedName)) return contact.verifiedName
    }
    
    // Try to get name from API
    try {
        const nameFromApi = await conn.getName(jid)
        if (isValid(nameFromApi)) return nameFromApi
    } catch {}
    
    // Try to get from group metadata participants
    try {
        const groupJid = Object.keys(conn.chats || {}).find(id => 
            conn.chats[id].participants?.some(p => p.id === jid)
        )
        if (groupJid) {
            const participant = conn.chats[groupJid].participants?.find(p => p.id === jid)
            if (participant && isValid(participant.notify)) return participant.notify
        }
    } catch {}
    
    // Try to get business name or status
    try {
        const profile = await conn.fetchStatus(jid).catch(() => null)
        if (profile && isValid(profile.status)) {
            // If status looks like a name (not a typical status message)
            if (profile.status.length < 30 && !/[📱💬🔥❤️]/g.test(profile.status)) {
                return profile.status
            }
        }
    } catch {}
    
    // Last resort: format the phone number nicely
    const phoneNumber = jid.split('@')[0]
    return `Utente ${phoneNumber}`
}

async function getUserProfilePic(conn, jid) {
    try {
        const url = await conn.profilePictureUrl(jid, 'image')
        if (url) {
            const res = await fetch(url)
            if (res.ok) return Buffer.from(await res.arrayBuffer())
        }
    } catch {}
    
    // Return default avatar if no profile picture found
    try {
        const res = await fetch(DEFAULT_AVATAR_URL)
        if (res.ok) return Buffer.from(await res.arrayBuffer())
    } catch {}
    
    return null
}

async function getGroupBackgroundImage(groupJid, conn) {
    if (groupBackgroundCache.has(groupJid)) return groupBackgroundCache.get(groupJid)
    let buffer = null
    try {
        const url = await conn.profilePictureUrl(groupJid, 'image').catch(() => null)
        if (url) {
            const res = await fetch(url)
            if (res.ok) buffer = Buffer.from(await res.arrayBuffer())
        }
        if (!buffer) {
            const fallback = path.join(__dirname, '..', 'media', 'benvenuto-addio.jpg')
            buffer = await fs.readFile(fallback)
        }
        const img = await loadImage(buffer)
        groupBackgroundCache.set(groupJid, img)
        return img
    } catch {
        const canvas = createCanvas(2400, 1200)
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#333'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#FFF'
        ctx.font = 'bold 100px Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('Benvenuto/a!', canvas.width / 2, canvas.height / 2)
        const img = await loadImage(canvas.toBuffer())
        groupBackgroundCache.set(groupJid, img)
        return img
    }
}

async function createCircularProfilePic(profileBuffer, size = 300) {
    if (!profileBuffer) {
        // Use default avatar if no profile picture
        try {
            const res = await fetch(DEFAULT_AVATAR_URL)
            if (res.ok) {
                profileBuffer = Buffer.from(await res.arrayBuffer())
            }
        } catch {}
    }
    
    if (!profileBuffer) return null
    
    try {
        const pfpImage = await loadImage(profileBuffer)
        const canvas = createCanvas(size, size)
        const ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(pfpImage, 0, 0, size, size)
        ctx.beginPath()
        ctx.arc(size / 2, size / 2, (size / 2) - 3, 0, Math.PI * 2)
        ctx.lineWidth = 8
        ctx.strokeStyle = '#FFF'
        ctx.stroke()
        return canvas
    } catch {
        return null
    }
}

async function createImage(title, username, groupName, profilePicBuffer, isGoodbye = false, groupJid, who, conn) {
    try {
        await setupFonts()
        const width = 2800, height = 1400
        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')
        const background = await getGroupBackgroundImage(groupJid, conn)
        const scale = Math.max(width / background.width, height / background.height) * 1.3
        const scaledWidth = background.width * scale
        const scaledHeight = background.height * scale
        const x = (width - scaledWidth) / 2
        const y = (height - scaledHeight) / 2

        ctx.filter = 'blur(12px)'
        ctx.drawImage(background, x, y, scaledWidth, scaledHeight)
        ctx.filter = 'none'

        ctx.save()
        ctx.globalAlpha = 0.7
        for (let i = 0; i < 120; i++) {
            ctx.beginPath()
            ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 4 + 2, 0, Math.PI * 2)
            ctx.fillStyle = '#fff'
            ctx.fill()
        }
        ctx.restore()

        const cardWidth = width - 240
        const cardHeight = height - 200
        const cardX = (width - cardWidth) / 2
        const cardY = (height - cardHeight) / 2
        
        ctx.save()
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)'
        ctx.shadowBlur = 30
        ctx.fillStyle = 'rgba(40, 40, 40, 0.88)'
        ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 35)
        ctx.fill()
        ctx.restore()

        const pfpSize = 280
        const pfpCanvas = await createCircularProfilePic(profilePicBuffer, pfpSize)
        const pfpX = width / 2 - pfpSize / 2
        const pfpY = cardY + 80
        
        if (pfpCanvas) {
            ctx.save()
            ctx.shadowColor = 'rgba(255, 255, 255, 0.9)'
            ctx.shadowBlur = 35
            ctx.beginPath()
            ctx.arc(width / 2, pfpY + pfpSize / 2, pfpSize / 2 + 8, 0, Math.PI * 2)
            ctx.closePath()
            ctx.fillStyle = '#ffffff'
            ctx.fill()
            ctx.restore()
            ctx.drawImage(pfpCanvas, pfpX, pfpY)
        }

        const centerX = width / 2
        const titleY = pfpY + pfpSize + 120
        const usernameY = titleY + 140
        const groupY = usernameY + 120
        const decorationY = cardY + cardHeight - 80
        
        // Increased font sizes by 10px
        ctx.save()
        ctx.font = 'bold 150px Arial, "Montserrat", "Segoe UI", "Liberation Sans", "Noto Sans", sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)'
        ctx.shadowBlur = 30
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 5
        ctx.strokeText(isGoodbye ? '✧ ADDIO! ✧' : '✧ BENVENUTO! ✧', centerX, titleY)
        ctx.fillStyle = '#ffffff'
        ctx.fillText(isGoodbye ? '✧ ADDIO! ✧' : '✧ BENVENUTO! ✧', centerX, titleY)
        ctx.restore()

        ctx.save()
        ctx.font = 'bold 110px Arial, "Montserrat", "Segoe UI", "Liberation Sans", "Noto Sans", sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
        ctx.shadowBlur = 25
        ctx.fillStyle = '#fff'
        ctx.fillText(`❈ ${username} ❈`, centerX, usernameY)
        ctx.restore()

        ctx.save()
        ctx.font = 'bold 100px Arial, "Montserrat", "Segoe UI", "Liberation Sans", "Noto Sans", sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = 'rgba(255, 255, 255, 0.7)'
        ctx.shadowBlur = 20
        ctx.fillStyle = '#cccccc'
        ctx.fillText(`${groupName || 'Questo Gruppo'}`, centerX, groupY)
        ctx.restore()

        ctx.save()
        ctx.font = '80px Arial, "Montserrat", "Segoe UI", "Liberation Sans", "Noto Sans", sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)'
        ctx.shadowBlur = 25
        ctx.fillStyle = '#ffffff'
        ctx.fillText('⭑⭒━━━✦☾⋆⁺₊✧ developed by vare ✧₊⁺⋆☽✦━━━⭒⭑', centerX, decorationY)
        ctx.restore()

        return canvas.toBuffer('image/png')
    } catch (error) {
        return null
    }
}

const requestCounter = { count: 0, lastReset: Date.now(), isBlocked: false, blockUntil: 0 }
function checkAntiSpam() {
    const now = Date.now()
    if (now - requestCounter.lastReset > 30000) {
        requestCounter.count = 0
        requestCounter.lastReset = now
    }
    if (requestCounter.isBlocked) {
        if (now < requestCounter.blockUntil) return false
        requestCounter.isBlocked = false
        requestCounter.count = 0
    }
    requestCounter.count++
    if (requestCounter.count > 8) {
        requestCounter.isBlocked = true
        requestCounter.blockUntil = now + 30000
        return false
    }
    return true
}

// Function to replace placeholders in custom messages
function replacePlaceholders(message, who, username, groupName, memberCount, displayName) {
    return message
        .replace(/@user/g, `@${who.split('@')[0]}`)
        .replace(/\$gruppo/g, groupName)
        .replace(/\$nome/g, displayName)
        .replace(/\$membri/g, memberCount.toString())
        .replace(/\$numero/g, who.split('@')[0])
        .replace(/\$tag/g, `@${who.split('@')[0]}`)
}

// Command handler for setting welcome/goodbye messages
export async function handler(m, { conn, text, command, isAdmin, isOwner }) {
    // Limitazione rimossa: ora funziona ovunque, anche con ossessionbot!
    // --- BLOCCO ORIGINALE RIMOSSO ---
    // const filesToCheck = [
    //     './termini.jpeg',
    //     './CODE_OF_CONDUCT.md',
    //     './bal.png',
    //     './plugins/OWNER_file.js'
    // ]
    // for (const filePath of filesToCheck) {
    //     try {
    //         await fs.access(filePath)
    //     } catch {
    //         return m.reply('Questo comando è disponibile solo con la base di ChatUnity.')
    //     }
    // }
    // ---------------------------------

    if (!m.isGroup) return m.reply('❌ Questo comando funziona solo nei gruppi!')
    if (!isAdmin && !isOwner) return m.reply('❌ Solo gli admin possono usare questo comando!')
    
    const chat = global.db.data.chats[m.chat] || {}
    
    // Initialize custom messages if not exist
    if (!chat.customWelcome) chat.customWelcome = null
    if (!chat.customGoodbye) chat.customGoodbye = null
    if (!chat.welcomeEnabled) chat.welcomeEnabled = true
    
    const cmd = command.toLowerCase()
    
    // Handle different commands
    if (['setbenvenuto', 'setwelcome', 'benvenuto'].includes(cmd)) {
        if (!text) {
            return m.reply(`🎉 *Imposta messaggio di benvenuto*

*Uso:* ${command} <messaggio>

*Variabili disponibili:*
• @user - Tag dell'utente
• \$nome - Nome dell'utente  
• \$gruppo - Nome del gruppo
• \$membri - Numero membri
• \$numero - Numero di telefono
• \$tag - Tag utente (alias di @user)

*Esempio:*
${command} Ciao @user! 👋 Benvenuto/a in \$gruppo! Ora siamo \$membri membri! 🎉

*Per ripristinare il messaggio predefinito:*
${command} reset`)
        }
        
        if (text.toLowerCase() === 'reset') {
            chat.customWelcome = null
            global.db.data.chats[m.chat] = chat
            return m.reply('✅ Messaggio di benvenuto ripristinato al predefinito!')
        }
        
        chat.customWelcome = text
        global.db.data.chats[m.chat] = chat
        return m.reply('✅ Messaggio di benvenuto personalizzato impostato!')
        
    } else if (['setaddio', 'setgoodbye', 'addio'].includes(cmd)) {
        if (!text) {
            return m.reply(`👋 *Imposta messaggio di addio*

*Uso:* ${command} <messaggio>

*Variabili disponibili:*
• @user - Tag dell'utente
• \$nome - Nome dell'utente  
• \$gruppo - Nome del gruppo
• \$membri - Numero membri
• \$numero - Numero di telefono
• \$tag - Tag utente (alias di @user)

*Esempio:*
${command} Addio @user! 😢 Ci mancherai in \$gruppo. Rimaniamo in \$membri membri.

*Per ripristinare il messaggio predefinito:*
${command} reset`)
        }
        
        if (text.toLowerCase() === 'reset') {
            chat.customGoodbye = null
            global.db.data.chats[m.chat] = chat
            return m.reply('✅ Messaggio di addio ripristinato al predefinito!')
        }
        
        chat.customGoodbye = text
        global.db.data.chats[m.chat] = chat
        return m.reply('✅ Messaggio di addio personalizzato impostato!')
        
    } else if (['welcomeconfig', 'configbenvenuto', 'impostazioni'].includes(cmd)) {
        const status = chat.welcomeEnabled ? '✅ Attivo' : '❌ Disattivo'
        const welcomeMsg = chat.customWelcome || '*Messaggio predefinito*'
        const goodbyeMsg = chat.customGoodbye || '*Messaggio predefinito*'
        
        return m.reply(`⚙️ *Configurazione Benvenuto/Addio*

*Status:* ${status}
*Immagini:* ✅ Sempre attive

*Messaggio Benvenuto:*
${welcomeMsg}

*Messaggio Addio:*
${goodbyeMsg}

*Comandi disponibili:*
• .setbenvenuto - Imposta messaggio benvenuto
• .setaddio - Imposta messaggio addio  
• .togglewelcome - Attiva/disattiva sistema
• .testwelcome - Testa messaggio benvenuto
• .testgoodbye - Testa messaggio addio`)
        
    } else if (['togglewelcome', 'welcome'].includes(cmd)) {
        chat.welcomeEnabled = !chat.welcomeEnabled
        global.db.data.chats[m.chat] = chat
        const status = chat.welcomeEnabled ? 'attivato' : 'disattivato'
        return m.reply(`✅ Sistema benvenuto/addio ${status}!`)
        
    } else if (['testwelcome', 'testbenvenuto'].includes(cmd)) {
        const username = await getUserName(conn, m.sender)
        const groupName = (await conn.groupMetadata(m.chat)).subject
        const memberCount = (await conn.groupMetadata(m.chat)).participants.length
        
        let displayName = username
        if (username.startsWith('@') || username === '𝐍𝐮𝐨𝐯𝐨 𝐌𝐞𝐦𝐛𝐫𝐨') {
            displayName = `Utente ${m.sender.split('@')[0]}`
        }
        
        const defaultMsg = `*Benvenuto/a* @${m.sender.split('@')[0]} 🎉\n┊ *Gruppo:* ${groupName}\n╰► *Membri:* ${memberCount}`
        const customMsg = chat.customWelcome 
            ? replacePlaceholders(chat.customWelcome, m.sender, username, groupName, memberCount, displayName)
            : defaultMsg
            
        return m.reply(`🧪 *Test Messaggio Benvenuto:*\n\n${customMsg}`, null, { mentions: [m.sender] })
        
    } else if (['testgoodbye', 'testaddio'].includes(cmd)) {
        const username = await getUserName(conn, m.sender)
        const groupName = (await conn.groupMetadata(m.chat)).subject
        const memberCount = (await conn.groupMetadata(m.chat)).participants.length
        
        let displayName = username
        if (username.startsWith('@') || username === '𝐍𝐮𝐨𝐯𝐨 𝐌𝐞𝐦𝐛𝐫𝐨') {
            displayName = `Utente ${m.sender.split('@')[0]}`
        }
        
        const defaultMsg = `*Arrivederci* @${m.sender.split('@')[0]} 👋\n┊ Ha lasciato il gruppo\n╰► *Membri rimasti:* ${memberCount}`
        const customMsg = chat.customGoodbye 
            ? replacePlaceholders(chat.customGoodbye, m.sender, username, groupName, memberCount, displayName)
            : defaultMsg
            
        return m.reply(`🧪 *Test Messaggio Addio:*\n\n${customMsg}`, null, { mentions: [m.sender] })
    }
}

handler.command = /^(setbenvenuto|setwelcome|benvenuto|setaddio|setgoodbye|addio|welcomeconfig|configbenvenuto|impostazioni|togglewelcome|welcome|testwelcome|testbenvenuto|testgoodbye|testaddio)$/i
handler.group = true
handler.admin = true

export async function before(m, { conn, groupMetadata }) {
    if (!m.isGroup || !m.messageStubType) return true
    if (!checkAntiSpam()) return true
    const chat = global.db?.data?.chats?.[m.chat]
    if (!chat || chat.welcome === false || chat.welcomeEnabled === false) return true
    const who = m.messageStubParameters?.[0]
    const pushNameFromStub = m.messageStubParameters?.[1]
    if (!who || typeof who !== 'string' || !who.includes('@')) return true
    try {
        const username = await getUserName(conn, who, pushNameFromStub)
        const groupJid = m.chat
        const groupName = groupMetadata?.subject || 'Questo Gruppo'
        const memberCount = groupMetadata?.participants?.length || 0
        const profilePic = await Promise.race([
            getUserProfilePic(conn, who),
            new Promise(resolve => setTimeout(() => resolve(null), 2000))
        ])
        
        let displayName = username
        if (username.startsWith('@') || username === '𝐍𝐮𝐨𝐯𝐨 𝐌𝐞𝐦𝐛𝐫𝐨') {
            displayName = `Utente ${who.split('@')[0]}`
        }
        
        const sendWelcomeMessage = async (isGoodbye = false) => {
            // Use custom message if available, otherwise use default
            let caption
            if (isGoodbye) {
                const defaultMsg = `*Arrivederci* @${who.split('@')[0]} 👋\n┊ Ha lasciato il gruppo\n╰► *Membri rimasti:* ${memberCount}`
                caption = chat.customGoodbye 
                    ? replacePlaceholders(chat.customGoodbye, who, username, groupName, memberCount, displayName)
                    : defaultMsg
            } else {
                const defaultMsg = `*Benvenuto/a* @${who.split('@')[0]} 🎉\n┊ *Gruppo:* ${groupName}\n╰► *Membri:* ${memberCount}`
                caption = chat.customWelcome 
                    ? replacePlaceholders(chat.customWelcome, who, username, groupName, memberCount, displayName)
                    : defaultMsg
            }
            
            try {
                const image = await Promise.race([
                    createImage(
                        isGoodbye ? 'GOODBYE' : 'WELCOME',
                        displayName,
                        groupName,
                        profilePic,
                        isGoodbye,
                        groupJid,
                        who,
                        conn
                    ),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
                ])
                if (image) {
                    await conn.sendMessage(m.chat, {
                        image,
                        caption,
                        mentions: [who]
                    })
                } else throw new Error('Immagine non generata')
            } catch {
                await conn.sendMessage(m.chat, {
                    text: caption,
                    mentions: [who]
                })
            }
        }
        if (
            m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD ||
            m.messageStubType === 'GROUP_MEMBERSHIP_JOIN_APPROVAL_REQUEST_NON_ADMIN_ADD'
        ) {
            await sendWelcomeMessage(false)
        } else if (
            [WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)
        ) {
            await sendWelcomeMessage(true)
        }
    } catch (error) {
        console.error('Errore:', error)
    }
    return true
}

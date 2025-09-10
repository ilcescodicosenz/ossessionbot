// ... tutto il resto invariato sopra ...

// Command handler for setting welcome/goodbye messages
export async function handler(m, { conn, text, command, isAdmin, isOwner }) {
    // Richiedi la presenza di alcuni file come protezione base
    const filesToCheck = [
        './termini.jpeg',
        './CODE_OF_CONDUCT.md',
        './bal.png',
        './plugins/OWNER_file.js'
    ]
    for (const filePath of filesToCheck) {
        try {
            await fs.access(filePath)
        } catch {
            return m.reply('Questo comando è disponibile solo con la base di Ossessionbot.')
        }
    }

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
${command} Benvenutə @user! Presentati con nome, età e di dove sei e la foto se vuoi. Segui le regole e buona permanenza. Se hai qualche problema scrivi agli admin.

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
        
        // DEFAULT benvenuto aggiornato!
        const defaultMsg = `Benvenutə @${m.sender.split('@')[0]}! Presentati con nome, età e di dove sei e la foto se vuoi. Segui le regole e buona permanenza. Se hai qualche problema scrivi agli admin.`
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
                // DEFAULT benvenuto aggiornato!
                const defaultMsg = `Benvenutə @${who.split('@')[0]}! Presentati con nome, età e di dove sei e la foto se vuoi. Segui le regole e buona permanenza. Se hai qualche problema scrivi agli admin.`
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

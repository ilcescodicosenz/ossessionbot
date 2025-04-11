import { createHash } from 'crypto'

let Reg = /\|?(.*)\s+(Maschio|Femmina|Altro)\s+(\d{2}\/\d{2}\/\d{4})$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => './src/profilo.png')

  if (user.registered === true) {
    throw `✳️ *Sei già registrato!*\n\n🔄 Vuoi registrarti di nuovo?\n\n📌 Usa questo comando per rimuovere la tua registrazione:\n\n*${usedPrefix}unreg <sn>*`
  }

  let usage = `🔹 *Uso del comando:* *${usedPrefix + command} Nome Genere Data di Nascita*\n\n📌 *Esempio:*\n  ${usedPrefix + command} Cesco Maschio  16/03/2005\n\n🔹 *Generi utilizzabili:*\n  - *Maschio* = Maschio\n  - *Femmina* = Femmina\n  - *Altro* = Altro`

  if (!Reg.test(text)) throw usage

  let [_, name, gender, birthDate] = text.match(Reg)

  if (!name || !birthDate) throw usage
  if (name.length >= 30) throw `⚠️ Il nome è troppo lungo!`

  // Calcolo dell'età dalla data di nascita
  let [day, month, year] = birthDate.split('/').map(Number)
  let birth = new Date(year, month - 1, day)
  let now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  let monthDiff = now.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--
  }

  // Verifica validità della data di nascita
  if (isNaN(birth) || age < 0) age = -1

  if (age > 60) throw `👴🏻 *Sei troppo vecchio per registrarti!*`
  if (age < 10) throw `⚠️ *Sei troppo piccolo per registrarti!*`

  let genStr = gender.toLowerCase() === 'maschio' ? `Maschio` :
               gender.toLowerCase() === 'femmina' ? `Femmina` :
               gender.toLowerCase() === 'altro' ? `Non binario` : null

  if (!genStr) throw `⚠️ *Scegli tra i seguenti generi:*\n  - *Maschio*\n  - *Femmina*\n  - *Altro*`

  user.name = name.trim()
  user.birthDate = birthDate
  user.age = isFinite(age) && age >= 0 ? age : -1
  user.gender = genStr
  user.regTime = +new Date()
  user.registered = true

  let sn = createHash('md5').update(m.sender).digest('hex')

  let regi = `✅ *Registrazione completata!*\n\n▢ *Nome:* ${name}\n▢ *Genere:* ${genStr}\n▢ *Data di Nascita:* ${birthDate}\n▢ *Età:* ${age}\n\n📌 *Numero seriale:*\n${sn}`

  conn.reply(m.chat, regi, m)
  console.log(user)
}

handler.help = ['reg'].map(v => v + ' <nome genere data_di_nascita>')
handler.tags = ['rg']
handler.command = ['verify', 'reg', 'registrami', 'registrar'] 

export default handler

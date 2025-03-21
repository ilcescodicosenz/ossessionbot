let handler = async (m) => {
    let funzionitotali = Object.values(global.plugins).filter(v => v.command).length;
    let num1 = ['𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'];
    let num2 = funzionitotali.toString().split('').map(digit => num1[digit]).join('');
    m.reply(`ⓘ 𝐈𝐥 𝐛𝐨𝐭 𝐭𝐢𝐞𝐧𝐞  𝟒𝟎𝟎 𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐢 𝐭𝐨𝐭𝐚𝐥𝐢 
     𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐢 𝐚𝐭𝐭𝐢𝐯𝐞: ${num2} .`);
}
handler.command = ['funzionitotali', 'functions'];
export default handler;
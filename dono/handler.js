case 'dono':
case 'owner': {
  let texto = `👑 *Dono do Projeto*
Renan Vargas

📲 *Grupo oficial*
https://chat.whatsapp.com/LTr7T0GbefpIhXA2SRnOa4

📢 *Canal oficial*
https://whatsapp.com/channel/0029VbBeG1wJENy4GKdY0i0Z

🤖 Bot WhatsApp MD
🛠 Termux / Node.js
`
  conn.sendMessage(m.chat, { text: texto }, { quoted: m })
}
break

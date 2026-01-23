const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const prefix = '-'
const dono = '5532998665591@c.us'
const nomeDono = 'Renanvargas'
const botNome = 'R.v'

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "R.v-Bot" }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
})

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
  console.log('📲 Escaneie o QR ou conecte com número')
})

client.on('ready', () => {
  console.log(`✅ ${botNome} conectado com sucesso!`)
})

client.on('message', async msg => {
  if (!msg.body.startsWith(prefix)) return

  const comando = msg.body.slice(1).toLowerCase()

  if (comando === 'menu') {
    msg.reply(`
🤖 *${botNome}*
👑 Dono: ${nomeDono}

🎮 *Brincadeiras*
${prefix}beijar
${prefix}abraçar
${prefix}casar

⚙️ *Info*
${prefix}dono
`)
  }

  if (comando === 'beijar') {
    msg.reply('💋 te deu um beijo 😘')
  }

  if (comando === 'abraçar') {
    msg.reply('🤗 abraço apertadooo')
  }

  if (comando === 'casar') {
    msg.reply('💍 agora vocês estão casados 😂')
  }

  if (comando === 'dono') {
    msg.reply(`👑 Dono do bot: ${nomeDono}`)
  }
})

client.initialize()

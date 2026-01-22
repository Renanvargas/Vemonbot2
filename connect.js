const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')

const readline = require('readline')

async function connect() {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const { version } = await fetchLatestBaileysVersion()

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('📱 Digite seu número com DDI (ex: 5532998665591): ', async (number) => {
    const sock = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: false,
      browser: ['Vemonbot2', 'Chrome', '1.0.0']
    })

    sock.ev.on('creds.update', saveCreds)

    const code = await sock.requestPairingCode(number)
    console.log(`🔢 Código de pareamento: ${code}`)

    rl.close()
  })
}

connect()

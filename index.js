const fs = require('fs');
const talkdrove = JSON.parse(fs.readFileSync('./talkdrove.json'));

const sock = makeWASocket({
  logger,
  auth: state,
  printQRInTerminal: !talkdrove.usePairingCode
});

if (talkdrove.usePairingCode && !state.creds.registered) {
  try {
    const code = await sock.requestPairingCode(talkdrove.phoneNumber);
    console.log('📲 Código de pareamento:', code);
    console.log('👉 WhatsApp > Aparelhos conectados > Conectar com número');
  } catch (err) {
    console.log('❌ Falha no código, mostrando QR Code...');
    sock.ev.on('connection.update', (update) => {
      if (update.qr) {
        console.log('📷 Escaneie o QR Code acima');
      }
    });
  }
}

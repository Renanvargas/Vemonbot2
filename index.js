const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  // 👉 É AQUI que você adiciona o trecho:
  if (talkdrove.usePairingCode && !state.creds.registered) {
    try {
      const code = await sock.requestPairingCode(talkdrove.phoneNumber);
      console.log('📲 Código de pareamento:', code);
    } catch (e) {
      console.log('❌ Falha no pareamento, use QR Code');
    }
  }

  sock.ev.on('creds.update', saveCreds);
}

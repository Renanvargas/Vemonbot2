const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "R.v-Bot"
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    }
});

client.on('ready', () => {
    console.log('✅ R.v Bot conectado com sucesso!');
});

client.on('message', msg => {
    if (msg.body.toLowerCase() === 'oi') {
        msg.reply('Olá! Sou o R.v Bot 🤖🔥\nComo posso ajudar?');
    }
});

(async () => {
    await client.initialize();

    // 📲 Número com DDI (Brasil = 55)
    const phoneNumber = '5532998665591';

    const code = await client.requestPairingCode(phoneNumber);
    console.log('📲 Código para conectar:', code);
})();

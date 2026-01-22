const { Client, LocalAuth } = require('whatsapp-web.js');

const prefix = '!';
const dono = '5532998665591@c.us';

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "R.v-Bot" }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('ready', () => {
    console.log('✅ R.v Bot online!');
});

client.on('message', async msg => {
    const chat = await msg.getChat();
    const sender = msg.author || msg.from;
    const isDono = sender === dono;
    const isAdmin = chat.isGroup ? chat.participants.find(p => p.id._serialized === sender)?.isAdmin : false;

    // 🔒 ANTI-LINK
    if (chat.isGroup && !isAdmin && !isDono) {
        if (msg.body.match(/(https?:\/\/|www\.|chat\.whatsapp\.com)/gi)) {
            await msg.delete(true);
            msg.reply('🚫 Links não são permitidos aqui!');
            return;
        }
    }

    // ⛔ ANTI-SPAM
    if (msg.body.length > 400) {
        msg.reply('🚫 Spam detectado!');
        return;
    }

    if (!msg.body.startsWith(prefix)) return;

    const args = msg.body.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    // 📜 MENU PRINCIPAL
    if (cmd === 'menu') {
        msg.reply(`
🤖 *R.v Bot* 🤖

📜 *MENU PRINCIPAL*
${prefix}menu
${prefix}dono
${prefix}adm
${prefix}brincadeiras

⚙️ Prefixo: ${prefix}
        `);
    }

    // 👑 MENU DONO
    if (cmd === 'dono') {
        if (!isDono) return msg.reply('❌ Apenas o DONO.');
        msg.reply(`
👑 *MENU DONO*
${prefix}ping
${prefix}off
${prefix}on
        `);
    }

    // 🛡 MENU ADM
    if (cmd === 'adm') {
        if (!isAdmin && !isDono) return msg.reply('❌ Apenas ADMIN.');
        msg.reply(`
🛡 *MENU ADM*
${prefix}ban @membro
${prefix}mute
${prefix}unmute
        `);
    }

    // 🎮 BRINCADEIRAS
    if (cmd === 'brincadeiras') {
        msg.reply(`
🎮 *BRINCADEIRAS*
${prefix}dado
${prefix}caraoucoroa
${prefix}piada
        `);
    }

    // 🎲 DADO
    if (cmd === 'dado') {
        msg.reply(`🎲 Você tirou: ${Math.floor(Math.random() * 6) + 1}`);
    }

    // 🪙 CARA OU COROA
    if (cmd === 'caraoucoroa') {
        const res = Math.random() < 0.5 ? '🪙 Cara' : '🪙 Coroa';
        msg.reply(res);
    }

    // 😂 PIADA
    if (cmd === 'piada') {
        const piadas = [
            'Por que o computador foi ao médico? Porque pegou um vírus 😂',
            'Qual o cúmulo do surdo? Ouvir fofoca 😂',
            'Programador não morre, vira bug 👨‍💻'
        ];
        msg.reply(piadas[Math.floor(Math.random() * piadas.length)]);
    }

    // 🚫 BAN
    if (cmd === 'ban') {
        if (!isAdmin && !isDono) return;
        if (!msg.mentionedIds[0]) return msg.reply('Marque alguém!');
        await chat.removeParticipants([msg.mentionedIds[0]]);
        msg.reply('🚫 Usuário banido!');
    }

    // 🔇 MUTE
    if (cmd === 'mute') {
        if (!isAdmin && !isDono) return;
        chat.setMessagesAdminsOnly(true);
        msg.reply('🔇 Grupo mutado!');
    }

    // 🔊 UNMUTE
    if (cmd === 'unmute') {
        if (!isAdmin && !isDono) return;
        chat.setMessagesAdminsOnly(false);
        msg.reply('🔊 Grupo desmutado!');
    }

    // 🟢 PING
    if (cmd === 'ping') {
        msg.reply('🏓 Pong!');
    }
});

client.initialize();

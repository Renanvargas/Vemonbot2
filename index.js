const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require('@whiskeysockets/baileys');

const pino = require('pino');
const fs = require('fs');

const logger = pino({ level: 'silent' });

// arquivos JSON
const groupFile = './prefixos.json';
const userFile = './prefixos-user.json';

// garante arquivos
if (!fs.existsSync(groupFile)) fs.writeFileSync(groupFile, '{}');
if (!fs.existsSync(userFile)) fs.writeFileSync(userFile, '{}');

let groupPrefix = JSON.parse(fs.readFileSync(groupFile));
let userPrefix = JSON.parse(fs.readFileSync(userFile));

const DEFAULT_PREFIX = ['!', '.', '/'];

// ===== FUNÇÕES =====
const getGroupPrefix = (id) => groupPrefix[id];
const getUserPrefix = (id) => userPrefix[id];

const getPrefixFinal = (chatId, userId) => {
  return getUserPrefix(userId) || getGroupPrefix(chatId) || DEFAULT_PREFIX;
};

const setGroupPrefix = (chatId, prefix) => {
  groupPrefix[chatId] = prefix;
  fs.writeFileSync(groupFile, JSON.stringify(groupPrefix, null, 2));
};

const setUserPrefix = (userId, prefix) => {
  userPrefix[userId] = prefix;
  fs.writeFileSync(userFile, JSON.stringify(userPrefix, null, 2));
};

// ===== BOT =====
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth');

  const sock = makeWASocket({
    logger,
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
      if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
        startBot();
      }
    } else if (connection === 'open') {
      console.log('🤖 VemonBot2 conectado com sucesso!');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe) return;

    const from = m.key.remoteJid;
    const sender = m.key.participant || m.key.remoteJid;
    const isGroup = from.endsWith('@g.us');

    const text =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      '';

    const prefixos = getPrefixFinal(from

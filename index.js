import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"

async function connectBot() {
  const talkdrove = {
    usePairingCode: true, // usar código em vez de QR
    phoneNumber: "5532998665591" // seu número com DDI
  }

  const { state, saveCreds } = await useMultiFileAuthState("./session")
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: !talkdrove.usePairingCode
  })

  // 🔐 Pareamento automático
  if (talkdrove.usePairingCode && !state.creds.registered) {
    try {
      const code = await sock.requestPairingCode(talkdrove.phoneNumber)
      console.log("📲 Código de pareamento:", code)
    } catch (e) {
      console.log("❌ Falha no pareamento, use QR Code")
    }
  }

  // 🔄 Salvar credenciais
  sock.ev.on("creds.update", saveCreds)

  // 💬 Quando o bot receber mensagens
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0]
    if (!m.message || !m.key.remoteJid) return

    const texto = (m.message.conversation || m.message.extendedTextMessage?.text || "").trim()

    if (texto === ".ping") {
      await sock.sendMessage(m.key.remoteJid, { text: "🏓 Pong!" })
    } else if (texto === ".menu") {
      const menu = `
📜 *MENU DO BOT*
━━━━━━━━━━━━━━
⚙️ .ping — Testar o bot
🎮 .brincar — Ver comandos divertidos
💬 .menu — Mostrar este menu
━━━━━━━━━━━━━━
Feito com ❤️ no Termux
`
      await sock.sendMessage(m.key.remoteJid, { text: menu })
    } else if (texto === ".brincar") {
      const brincar = `
🎉 *MENU BRINCAR* 🎉

│ 🎲 .dado — Número aleatório
│ 🎯 .caraoucoroa — Cara ou coroa
│ 💘 .ship @pessoa1 @pessoa2 — Teste de amor
│ 🎤 .piada — Piada aleatória
│ 🕹️ .jokempo — Pedra, papel ou tesoura
`
      await sock.sendMessage(m.key.remoteJid, { text: brincar })
    }
  })
}

connectBot()

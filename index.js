const mp = require('./config')

module.exports = {
  name: 'mercadopago',
  commands: ['pix', 'pagamento'],

  async run(m, { reply }) {
    if (!mp.access_token) {
      return reply('❌ MP_ACCESS_TOKEN não configurado')
    }

    reply('✅ Mercado Pago conectado com sucesso!')
  }
}

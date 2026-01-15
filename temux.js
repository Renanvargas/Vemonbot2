/**
 * Loader principal do Vemonbot2
 * Compatível com CommonJS
 */

const fs = require('fs')

console.log('🚀 Iniciando Vemonbot2...')

// Detecta automaticamente o arquivo principal
if (fs.existsSync('./connect.js')) {
  require('./connect.js')
} else if (fs.existsSync('./arcc.js')) {
  require('./arcc.js')
} else {
  console.error('❌ Nenhum arquivo principal encontrado (connect.js ou arcc.js)')
  process.exit(1)
}

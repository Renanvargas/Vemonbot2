require('dotenv').config()
const fs = require('fs')
const path = require('path')

console.log('📡 connect.js carregado')

// ===== AQUI ENTRA SEU CÓDIGO DO BAILEYS =====
// (o Vemonbot2 já tem isso, NÃO apague)
// ==========================================


// ===== CARREGADOR DE PLUGINS =====
const pluginsPath = path.join(__dirname, 'plugins')

if (fs.existsSync(pluginsPath)) {
  fs.readdirSync(pluginsPath).forEach(dir => {
    const pluginIndex = path.join(pluginsPath, dir, 'index.js')
    if (fs.existsSync(pluginIndex)) {
      require(pluginIndex)
      console.log(`✅ Plugin carregado: ${dir}`)
    }
  })
}

const fs = require('fs')
const path = require('path')

const pluginsPath = path.join(__dirname, 'plugins')

fs.readdirSync(pluginsPath).forEach(dir => {
  const pluginFile = path.join(pluginsPath, dir, 'index.js')
  if (fs.existsSync(pluginFile)) {
    require(pluginFile)
    console.log(`✅ Plugin carregado: ${dir}`)
  }
})

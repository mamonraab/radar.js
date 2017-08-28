function log (msg, type = '') {
  const timestamp = new Date().toTimeString().split(' ')[0]
  const isDebug = config.debug
  let icon = ''
  switch (type) {
    case 'info':
      icon = '📄'
      break
    case 'error':
      icon = '💥'
      break
    case 'warn':
      icon = '⚠️'
      break
    case 'debug':
      icon = '🐛'
    default:
  }
  if (type.toLowerCase() !== 'debug' || isDebug) {
    console.log(`[${timestamp}] ${icon}\t${msg}`)
  }
}

// register types
['error', 'info', 'warn', 'debug'].forEach(type => {
  log[type] = msg => log(msg, type)
})

module.exports = {
  log
}

function log (type = '', ...msg) {
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
      break
    default:
  }

  if (['error', 'info', 'warn', 'debug'].indexOf(type) === -1) {
    msg.unshift(type)
  }
  if (type.toLowerCase() !== 'debug' || isDebug) {
    console.log(`[${timestamp}] ${icon}\t${msg.join(' ')}`)
  }
}

// register types
['error', 'info', 'warn', 'debug'].forEach(type => {
  log[type] = (...msg) => log(type, ...msg)
})

module.exports = {
  log
}

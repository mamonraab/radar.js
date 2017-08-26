function log (msg, type = 'info') {
  const timestamp = new Date().toISOString()
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
  }
  console.log(`${timestamp} ${icon}: ${msg}`)
}

module.exports = {
  log
}

const Ws = require('ws')

function start (opts) {
  const wss = new Ws.Server({ port: opts.port })
  log.info(`Starting server on port ${opts.port}`)
  wss.on('connection', function connection (ws, req) {
    log.info(`client joined, total ${wss.clients.size} active`)
    ws.on('message', function incoming (message) {
      log.debug(`received: ${message}`)
    })

    ws.send('something')
  })
}

module.exports = {
  start
}

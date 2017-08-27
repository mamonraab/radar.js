const Server = require('./lib/server')
global.log = require('./lib/logger').log
global.config = require('./lib/config')

const server = new Server({port: config.port})

server.createEndpoint('mine', {
  path: '/'
})
server.addHook('mine', 'connection', function connection (ws, req) {
  log.info(`new client joined, total active: ${this.clients.size}`)
  ws.send('hello you')
  ws.on('message', function incoming (message) {
    log.debug(`received: ${message}`)
  })
})
server.start()

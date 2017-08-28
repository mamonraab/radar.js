const uuidv4 = require('uuid/v4')
const stats = require('./stats')

function mineJoined (ws, stats) {
  ws.id = uuidv4()
  log.info(`new client (${ws.id}) joined, total active: ${this.clients.size}`)
  ws.send(`hello ${ws.id}`)
  ws.on('message', function incoming (message) {
    log.debug(`received: ${message}`)
  })
}

function initEndpoint (server) {
  server.createEndpoint('mine', {
    path: '/'
  })
  server.addHook('mine', 'connection', function connection (ws, req) {
    mineJoined.call(this, ws, stats) // pass WebsocketServer instance as `this`
  })
}

module.exports = {
  initEndpoint
}

/**
 * This is a public facing endpoint that broadcasts statistics to all clients.
 */
const uuidv4 = require('uuid/v4')
const statistics = require('./stats')

function clientJoined (ws, stats) {
  ws.id = uuidv4()
  log.info(`new client (${ws.id}) joined, total active: ${this.clients.size}`)
  ws.send(`hello ${ws.id}`)
  // add mine to stats
  stats.mineSpotted(ws.id, ws)
  // register debug logs for messages received by the mine
  ws.on('message', function incoming (message) {
    stats.mineSpotted(ws.id, ws)
    log.debug(`received: ${message}`)
  })
}

function initEndpoint (server) {
  server.createEndpoint('stats', {
    path: '/stats'
  })
  server.addHook('stats', 'connection', function connection (ws, req) {
    clientJoined.call(this, ws, statistics) // pass WebsocketServer instance as `this`
  })
}

module.exports = {
  initEndpoint,
  clientJoined
}

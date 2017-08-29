/**
 * This is the endpoint that mines use to report their status.
 */
const uuidv4 = require('uuid/v4')
const statistics = require('./stats')

function clientJoined (ws, stats) {
  ws.id = uuidv4()
  log.info(`new mine (${ws.id}) joined, total active: ${this.clients.size}`)
  ws.send(`hello ${ws.id}`)
  // add mine to stats
  stats.mineSpotted(ws.id, ws)
  // register debug logs for messages received by the mine
  ws.on('message', function incoming (message) {
    stats.mineSpotted(ws.id, ws)
    log.debug(`@${ws.id}: ${message}`)
  })
}

function initEndpoint (server) {
  server.createEndpoint('mine', {
    path: '/mine'
  })
  server.addHook('mine', 'connection', function connection (ws, req) {
    clientJoined.call(this, ws, statistics) // pass WebsocketServer instance as `this`
  })
}

module.exports = {
  initEndpoint,
  clientJoined
}

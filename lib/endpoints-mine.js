const uuidv4 = require('uuid/v4')
const statistics = require('./stats')

function mineJoined (ws, stats) {
  ws.id = uuidv4()
  log.info(`new client (${ws.id}) joined, total active: ${this.clients.size}`)
  ws.send(`hello ${ws.id}`)
  // add mine to stats
  stats.mineSpotted(ws.id, ws)
  // register debug logs for messages received by the mine
  ws.on('message', function incoming (message) {
    stats.mineSpotted(ws.id, ws)
    if (message === 'stop') statistics.stopInterval()
    if (message === 'start') statistics.startInterval()
    if (message === 'update') statistics._update()
    log.debug(`received: ${message}`)
  })
}

function initEndpoint (server) {
  server.createEndpoint('mine', {
    path: '/'
  })
  server.addHook('mine', 'connection', function connection (ws, req) {
    mineJoined.call(this, ws, statistics) // pass WebsocketServer instance as `this`
  })
}

module.exports = {
  initEndpoint
}

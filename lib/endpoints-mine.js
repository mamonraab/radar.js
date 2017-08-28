function initEndpoint (server) {
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
}

module.exports = {
  initEndpoint
}

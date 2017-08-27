const assert = require('assert')
const http = require('http')
const Ws = require('ws')

class Server {
  constructor (opts = {}) {
    this.port = opts.port || 8080
    this.http = http.createServer()
    this.endpoints = new Map()
  }

  start () {
    this.http.listen(this.port)
    log.info(`Starting HTTP server on port ${this.port}`)
  }

  createEndpoint (name, opts) {
    assert(typeof name === 'string', 'endpoint name should be a string')
    assert(typeof opts.path === 'string', 'opts.path must be provided')
    this.endpoints.set(name, new Ws.Server({ server: this.http, path: opts.path }))
  }

  addHook (endpoint, event, fn) {
    assert(this.endpoints.get(endpoint) !== undefined, 'endpoint must already exist')
    assert(typeof event === 'string', 'event must be a string')
    const wss = this.endpoints.get(endpoint)
    wss.on(event, fn)
  }
}

module.exports = Server

/*
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
*/

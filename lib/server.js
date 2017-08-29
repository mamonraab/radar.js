const assert = require('assert')
const http = require('http')
const url = require('url')
const Ws = require('ws')

class Server {
  constructor (opts = {}) {
    this.port = opts.port || 8080
    this.http = http.createServer()
    this.endpoints = new Map()
  }

  start () {
    // reuse HTTP connection for multiple endpoints, see https://github.com/websockets/ws/pull/885#issue-187590719
    this.http.on('upgrade', (req, socket, head) => {
      const requestedPath = url.parse(req.url).pathname
      const matchingEndpoint = Array.from(this.endpoints).map(kv => kv[1]).find(endpoint => endpoint.path.toLowerCase() === requestedPath)
      if (!matchingEndpoint) {
        log.error(`Socket connection requested at invalid endpoint: ${requestedPath}`)
        socket.destroy()
      } else {
        matchingEndpoint.wss.handleUpgrade(req, socket, head, ws => matchingEndpoint.wss.emit('connection', ws))
      }
    })
    this.http.listen(this.port)
    log.info(`Starting HTTP server on port ${this.port}`)
  }

  createEndpoint (name, opts) {
    assert(typeof name === 'string', 'endpoint name should be a string')
    assert(typeof opts.path === 'string', 'opts.path must be provided')
    const wss = new Ws.Server({ noServer: true })
    this.endpoints.set(name, {wss, path: opts.path})
    return wss
  }

  addHook (endpoint, event, fn) {
    assert(this.endpoints.get(endpoint) !== undefined, 'endpoint must already exist')
    assert(typeof event === 'string', 'event must be a string')
    const wss = this.endpoints.get(endpoint).wss
    wss.on(event, fn)
  }
}

module.exports = Server

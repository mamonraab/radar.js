global.config = require('./lib/config')
global.log = require('./lib/logger').log
const Server = require('./lib/server')
const initMineEndpoint = require('./lib/endpoint-mine').initEndpoint
const statistics = require('./lib/stats')

const server = new Server({port: config.port})

initMineEndpoint(server)
server.start()

statistics.startInterval()

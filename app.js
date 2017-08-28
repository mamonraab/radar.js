const Server = require('./lib/server')
const initMineEndpoint = require('./lib/endpoints-mine').initEndpoint
global.log = require('./lib/logger').log
global.config = require('./lib/config')

const server = new Server({port: config.port})

initMineEndpoint(server)
server.start()

const server = require('./lib/server')
global.log = require('./lib/logger').log
global.config = require('./lib/config')

server.start({
  port: config.port
})

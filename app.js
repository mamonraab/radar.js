const server = require('./lib/server')
const log = require('./lib/logger').log
global.log = log

log('starting')

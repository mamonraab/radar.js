const server = require('./lib/server')
const log = require('./lib/logger').log
global.log = log

log.info('starting')
log.error('starting')
log('starting')

new Date().toTimeString()

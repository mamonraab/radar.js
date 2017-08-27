#!/usr/bin/env node
/**
 * Local dummy client for debug driven development
 */
const WebSocket = require('ws')
const log = require('./lib/logger').log
const RETRY_INTERVAL = 1 // [s]

let ws
function connect () {
  ws = new WebSocket('ws://localhost:8080')

  ws.on('open', function open () {
    ws.send('hello')
  })

  ws.on('message', function incoming (data) {
    console.log('>' + data)
  })

  ws.on('close', (code, reason) => {
    log.info(`Connection closed with code ${code}: ${reason}`)
    if (code === 1006) {
      retry()
    }
  })
  ws.on('error', e => log.error(e))
}

function retry () {
  log.info(`Retrying in ${RETRY_INTERVAL} seconds`)
  setTimeout(connect, RETRY_INTERVAL * 1000)
}

process.stdin.on('data', d => ws.send(d.toString().slice(0, -1))) // remove last character (typically \n)

connect()

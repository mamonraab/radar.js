const Ws = require('ws')

const wss = new Ws.Server({ port: 8080 })

console.log('yay')
wss.on('connection', function connection (ws, req) {
  console.log(`client joined, total ${wss.clients.size} active`)
  ws.on('message', function incoming (message) {
    console.log('received: %s', message)
  })

  ws.send('something')
})

const WebSocket = require('ws')
const { getGuilds, handleCacheRequest } = require('./cache')

let wss
let messageQueue = []

function customStringify (value) { // thanks bigint
  if (value !== undefined) {
    return JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v)
  }
}

function init () {
  wss = new WebSocket.Server({ port: 8080 })

  wss.on('connection', ws => {
    console.log('A client has connected')
    if (messageQueue.length !== 0) {
      console.log('Message queue for this consumer is not empty, sending...')
      messageQueue.forEach(m => {
        exports.broadcast(m)
      })
      console.log('Done.')
      messageQueue = []
    } else { // ensure that the consumer gets a complete guild cache
      const guildsObj = getGuilds()
      for (const guildID in guildsObj) {
        exports.broadcast({
          t: 'GUILD_CREATE',
          d: guildsObj[guildID]
        })
      }
    }

    ws.on('message', m => {
      try {
        m = JSON.parse(m)
      } catch (e) {
        console.error('Error parsing downstream websocket message', e, m)
        return
      }
      console.log('websocket downstream message', m)
      const toReturn = handleCacheRequest(m)
      console.log('sending back', { t: m.t, d: toReturn, uuid: m.uuid })
      ws.send(customStringify({ t: 'CACHE_REQUEST_RESPONSE', d: toReturn, uuid: m.uuid }))
    })
  })
}

exports.init = init

exports.broadcast = (payload) => {
  if (wss) {
    if (wss.clients.size === 0) {
      if (messageQueue.length >= 10000) { // if over 10k messages queued, just stop.
        messageQueue.shift()
      }
      messageQueue.push(payload)
    } else {
      wss.clients.forEach(c => {
        c.send(customStringify(payload))
      })
    }
  }
}

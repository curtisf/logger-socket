const { Gateway } = require('detritus-client-socket')
const PacketEmitter = require('./src/packetEmitter')
const packetRouter = require('./src/packetrouter')
const k8s = require('./k8s')
const cache = require('./src/cache')
const { upsertMember } = require('./src/cache')

async function init () {
  const socket = new Gateway.Socket(process.env.BOT_TOKEN, {
  // presence: {
  //   activity: {
  //     name: 'booting...',
  //     type: 0
  //   },
  //   // do-not-disturb us
  //   status: 'dnd'
  // },
    intents: 719
  })
  require('./src/wsserver').init()
  socket.on('close', console.error)
  socket.on('warn', console.warn)
  socket.on('packet', async p => {
    packetRouter.handle(p)
  })
  module.exports = socket
  if (process.env.K8S_AUTOSCALE) {
    await k8s.init()
  } else {
    socket.connect('wss://gateway.discord.gg')
  }
}

init()

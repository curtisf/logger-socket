const fs = require('fs')
const path = require('path')
const { broadcast } = require('./wsserver')

const allEvents = fs.readdirSync(path.resolve('src', 'events')).map(f => require(path.resolve('src', 'events', f))).reduce((map, file) => { map[file.name] = file.handle; return map }, {})

exports.handle = async packet => {
  console.log('packet', packet.t ? packet.t : 'no t')
  if (!packet.t) return
  if (packet.t && allEvents[packet.t]) {
    const additionalData = await allEvents[packet.t](packet.d)
    /*
     * Examples of additional data:
     * GUILD_CREATE: Create or get the guild document and pass to consumer
     * GUILD_DELETE: Delete the guild document (TODO: add option to not broadcast packet)
     * MEMBER_UPDATE: Get old member and pass as additional data
     * VOICE_STATE_UPDATE: Get old member and pass as additonal data
     */
    if (additionalData) {
      packet.additionalData = additionalData
      broadcast(packet)
      return
    }
  }
  broadcast(packet)
}

const { upsertMember } = require('../cache')

module.exports = {
  name: 'VOICE_STATE_UPDATE',
  handle: voiceState => {
    const memberChunk = voiceState.member
    delete voiceState.member
    memberChunk.voiceState = voiceState
    return upsertMember(voiceState.guild_id, memberChunk)
  }
}

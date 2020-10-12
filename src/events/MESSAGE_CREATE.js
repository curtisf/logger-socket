const { upsertMember } = require('../cache')

module.exports = {
  name: 'MESSAGE_CREATE',
  handle: message => {
    if (!message.author.bot && message.guild_id && message.member) {
      message.member.id = message.author.id
      upsertMember(message.guild_id, message.member)
    }
  }
}

const { upsertMember } = require('../cache')

module.exports = {
  name: 'GUILD_MEMBER_UPDATE',
  handle: member => {
    return upsertMember(member.guild_id, member) // return the old member as additionalData
  }
}

const guilds = {}
let makeMemorySavingMember = require('./utils').makeMemorySavingMember

module.exports.upsertMember = function (guildID, member) {
  if (!guilds[guildID]) return console.error('this should not happen')
  const oldMember = guilds[guildID].members[member.id]
  guilds[guildID].members[member.id] = makeMemorySavingMember(member)
  return oldMember
}

module.exports.addGuild = function (id, guild) {
  console.log('ag', makeMemorySavingMember)
  const guildMembers = {}
  guild.members.forEach(m => guildMembers[m.user.id] = makeMemorySavingMember(m))
  guild.members = guildMembers
  guilds[id] = guild
}

module.exports.updateGuild = function (id, guild) {
  guild[id] = { ...guilds[id], guild }
}

module.exports.getGuild = function (guildID) { return guilds[guildID] }

module.exports.getGuilds = function () { return guilds }

module.exports.handleCacheRequest = function (request) {
  if (!request.t || !request.d) return
  switch (request.t) {
    case 'GET_GUILD':
      return module.exports.getGuild(request.d.id)
  }
}

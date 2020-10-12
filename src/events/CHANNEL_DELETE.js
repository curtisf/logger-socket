const { getGuild, updateGuild } = require('../cache')

module.exports = {
  name: 'CHANNEL_DELETE',
  handle: channel => {
    const guild = getGuild(channel.guild_id)
    const channelIndex = guild.channels.indexOf(guild.channels.find(c => c.id === channel.id))
    const oldChannel = guild.channels[channelIndex]
    guild.channels.splice(channelIndex, 1)
    return oldChannel
  }
}

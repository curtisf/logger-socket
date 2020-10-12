const { getGuild } = require('../cache')

module.exports = {
  name: 'CHANNEL_UPDATE',
  handle: channel => {
    const guild = getGuild(channel.guild_id)
    const channelIndex = guild.channels.indexOf(guild.channels.find(c => c.id === channel.id))
    const oldChannel = guild.channels[channelIndex]
    guild.channels[channelIndex] = channel
    return oldChannel
  }
}

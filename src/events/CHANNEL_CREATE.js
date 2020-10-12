const { getGuild, updateGuild } = require('../cache')

module.exports = {
  name: 'CHANNEL_CREATE',
  handle: channel => {
    const guild = getGuild(channel.guild_id)
    guild.channels.push(channel)
    updateGuild(guild.id, { channels: guild.channels })
  }
}

const { updateGuild } = require('../cache')

module.exports = {
  name: 'GUILD_UPDATE',
  handle: newGuild => {
    updateGuild(newGuild.guild_id, newGuild)
  }
}

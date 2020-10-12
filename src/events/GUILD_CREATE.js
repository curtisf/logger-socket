const cache = require('../cache')

module.exports = {
  name: 'GUILD_CREATE',
  handle: g => {
    cache.addGuild(g.id, g)
  }
}

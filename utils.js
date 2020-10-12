const sa = require('superagent')

exports.getBotGateway = async () => {
  const gatewayData = await sa
    .get('https://discordapp.com/api/gateway/bot')
    .set({
      Authorization: 'Bot ' + process.env.BOT_TOKEN
    })
  console.log(gatewayData.body)
  return gatewayData.body
}

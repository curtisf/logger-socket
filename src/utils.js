module.exports = {
  makeMemorySavingMember: member => {
    let memorySavingMember = {
      roles: member.roles.map(r => BigInt(r)),
      id: member.id ? BigInt(member.id) : BigInt(member.user.id),
      joined_at: member.joinedAt ? BigInt(Date.parse(member.joined_at)) : 0,
      nick: member.nick
    }
    if (member.voiceState) memorySavingMember.voiceState = member.voiceState
    return memorySavingMember
  }
}

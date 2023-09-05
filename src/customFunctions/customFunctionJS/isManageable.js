module.exports = async (d) => {
  const data = d.util.aoiFunc(d);
  const [guildId = d.guild.id, userId, perm] = data.inside.splits;

  if (!userId || !perm) {

    return {
      code: d.util.setCode(data),
      error: "Both userID and perm parameters are required.",
    };
  }

  async function exc(func) {
    let p = await d.interpreter(d.client, {}, [], { code: func }, d.client.db, true);
    return p.code;
  }

  let permissions = {
ban: 'banmembers',
kick: 'kickmembers',
mute: 'mutemembers',
timeout: 'timeoutmembers',
move: 'movemembers',
changeNick: 'managenicknames',
timeout: 'moderatemembers',
giveRole: 'manageroles',
takeRole: 'manageroles'
}

  try {
    const guild = await d.client.guilds.fetch(guildId);

    const cHR = (await d.util.getMember(d.guild, d.client.user.id)).roles.highest;
    const uHR = (await d.util.getMember(d.guild, userId))?.roles.highest;
    const aHR = (await d.util.getMember(d.guild, d.author.id)).roles.highest;

    const clientPosition = cHR?.rawPosition > uHR?.rawPosition;
    const authorPosition = aHR?.rawPosition > uHR?.rawPosition;

    const perms = ((await exc(`$hasPerms[${guildId};${d.author.id};${permissions[perm]}]`)) && (await exc(`$hasPerms[${guildId};${d.client.user.id};${permissions[perm]}]`))) ? true : false;

    let can = ((clientPosition) && (authorPosition) && (perms)) ? "true" : "false";
    data.result = can;

  } catch (error) {

    const errorChannel = d.guild.channels.cache.get('your_error_channel_id');
    if (errorChannel) {
      errorChannel.send(`An error occurred: ${error.message}`);
    }
  }

  return {
    code: d.util.setCode(data),
  };
};

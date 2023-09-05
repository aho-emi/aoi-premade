 const { EmbedBuilder } = require('discord.js')
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    let [guildId = d.guild.id,
        title,
        description,
        color,
        thumbnail,
        image,
        footer,
        author,
        titleUrl,
        ...field] = data.inside.splits;

    let guild = await d.client.guilds.cache.get(guildId);

    const count = (type) => {
      return guild.channels.cache.filter((channel) => channel.type === type).size
    }

    const getCount = (type) => {
  switch (type) {
    case 'all':
      return guild.memberCount;
    case 'human':
      return guild.members.cache.filter((member) => !member.user.bot).size;
    case 'bot':
      return guild.members.cache.filter((member) => member.user.bot).size;
    case 'online':
      return guild.members.cache.filter((member) => member.presence?.status?.toLowerCase() === 'online').size;
    case 'idle':
      return guild.members.cache.filter((member) => member.presence?.status?.toLowerCase() === 'idle').size;
    case 'dnd':
      return guild.members.cache.filter((member) => member.presence?.status?.toLowerCase() === 'dnd').size;
    default:
      return 0;
  }
}

    const owner = await guild.members.fetch(guild.ownerId);
    const datas = {
      "{id}": guild.id,
      "{name}": guild.name,
      "{icon}": guild.iconURL(),
      "{allMemCount}": getCount('all'),
      "{humanCount}": getCount('human'),
      "{botCount}": getCount('bot'),
      "{onlineMemCount}" : `${getCount('online')}`,
      "{idleMemCount}": `${getCount('online')}`,
      "{dndMemCount}": `${getCount('online')}`,
      "{allChannelCount}": guild.channels.cache.size,
      "{voiceChannelCount}": `${count(2)}`,
      "{textChannelCount}": count(0),
      "{categoryCount}": `${count(4)}`,
      "{systemChannelId}": guild.systemChannelId || "None",
      "{bansCount}": `${guild.bans.cache.size}`,
      "{rolesCount}": `${guild.roles.cache.size}`,
      "{highestRole}": guild.roles.highest.id,
      "{lowestRole}": [...guild.roles.cache.sort((a, b) => a.position - b.position)][1]?.[0],
      "{splash}": guild.splashURL() || "None",
      "{banner}": guild.bannerURL() || "None",
      "{verificationLevel}": guild.verificationLevel,
      "{vanity}": guild.vanityURLCode ? `https://discord.gg/${guild.vanityURLCode}` : "None",
      "{nsfwLevel}": `${guild.nsfwLevel}`,
      "{mfaLevel}": `${guild.mfaLevel}`,
      "{emojiCount}": `${guild.emojis.cache.size}`,
      "{stickerCount}": `${guild.stickers.cache.size}`,
      "{ownerName}": owner.user.username,
      "{ownerId}": owner.user.id,
    };

    const replace = (match) => {
        return datas[match] || match;
    };


    title = await title?.replace(/\{[^}]+\}/g, replace);
    description = await description?.replace(/\{[^}]+\}/g, replace);
    thumbnail = await thumbnail?.replace(/\{[^}]+\}/g, replace);
    image = await image?.replace(/\{[^}]+\}/g, replace);
    footer = eval('(' + footer + ')')
    footer = {
      text: footer?.text?.replace(/\{[^}]+\}/g, replace),
      iconURL: footer?.icon?.replace(/\{[^}]+\}/g, replace)
    }
  console.log(footer)
    const embed = new EmbedBuilder()
     title? embed.setTitle(`${title.trim()}`): null;
     description? embed.setDescription(`${description.trim()}`) : null;
    color? embed.setColor(`${color.trim()}`) : null;
    thumbnail? embed.setThumbnail(`${thumbnail.trim()}`) : null;
    image? embed.setImage(`${image.trim()}`) : null;
    footer?.text ? embed.setFooter(footer) : null;

    
  
    d.channel.send({embeds: [embed]})

    return {
        code: d.util.setCode(data),
    };
};

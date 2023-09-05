const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, AttachmentBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = async (d) => {
const data = d.util.aoiFunc(d);
const [emojiResolve, type] = data.inside.splits;

const allEmoji = await d.client.emojis.cache.map((x) => x);
const filteredEmoji = allEmoji.filter(x => x.name.toLowerCase().includes(emojiResolve));
let currentPage = 1;
const emojiPerPage = 10;

let array = []
array.push(buildEmojiRow(filteredEmoji.slice(0, 5)));
if (filteredEmoji.slice(5, 10)[0]) {
array.push(buildEmojiRow(filteredEmoji.slice(5, 10)));
}
array.push(buildPaginationRow(currentPage, filteredEmoji.length, emojiPerPage));

const msg = await d.channel.send({
content: `Page 1 of ${Math.ceil(filteredEmoji.length / emojiPerPage)}`,
components: array,
});

const collector = msg.createMessageComponentCollector({ComponentType: ComponentType.Button, filter: (interaction) => interaction.user.id === d.message.author.id });

collector.on('collect', async (interaction) => {
const { customId } = interaction;
if (customId == 'previous' || customId == 'next') {
      if (customId === 'previous') {
        currentPage--;
      } else if (customId === 'next') {
        currentPage++;
      }

      const emojiList = filteredEmoji.slice((currentPage - 1) * emojiPerPage, currentPage * emojiPerPage);
  let array = []
array.push(buildEmojiRow(emojiList.slice(0, 5)));
if (emojiList.slice(5, 10)[0]) {
array.push(buildEmojiRow(emojiList.slice(5, 10)));
}
array.push(buildPaginationRow(currentPage, filteredEmoji.length, emojiPerPage));
  
      interaction.update({
        content: `Page ${currentPage} of ${Math.ceil(filteredEmoji.length / emojiPerPage)}`,
        components: array
      });
    }
  });

  // Uploading Emoji
  collector.on('collect', async (interaction) => {
    const split = (interaction.customId).split('_');
    if (split[0] == 'emoji') {
      const info = await emojiInfo(d, split[1]);

      let embed = new EmbedBuilder().setImage(info.url);

      let action = new ActionRowBuilder().addComponents([
        new ButtonBuilder()
          .setCustomId(`yes_${info.id}`)
          .setLabel('Yes')
          .setStyle(3),
        new ButtonBuilder()
          .setCustomId('no')
          .setLabel('No')
          .setStyle(4)
      ]);

      const mesag = await interaction.reply({
        content: `Is this alright? If you are **NOT** the owner of this emoji, or do not have permission to distribute it, select 'No'.`,
        embeds: [embed],
        components: [action],
        ephemeral: true
      })
      const collector = (await interaction.fetchReply()).createMessageComponentCollector({max: 1})
      collector.on('collect', async (interaction) => {
        const split2 = (interaction.customId).split('_')
        if ( split2[0] == 'yes' || split2[0] == 'no' ) {
        if ( split2[0] == 'yes') {
           await uploadEmoji(d, split2[1], interaction)
      } else {
          interaction.update({content: 'aborted!', embeds: [], components: []})
      }
    }
  })
 }
})


  return {
   code: d.util.setCode(data),
  };
};

const buildPaginationRow = (currentPage, totalPages, emojiPerPage) => {
  const buttons = [
    new ButtonBuilder()
      .setCustomId('previous')
      .setLabel('Previous')
      .setStyle(1)
      .setDisabled(currentPage === 1),
    new ButtonBuilder()
      .setCustomId('next')
      .setLabel('Next')
      .setStyle(1)
      .setDisabled(currentPage === totalPages),
  ];

  return new ActionRowBuilder().addComponents(buttons);
};

const buildEmojiRow = (emojiList) => {
  const buttons = emojiList.map((emoji) =>
    new ButtonBuilder()
      .setCustomId(`emoji_${emoji.id}`)
      .setLabel(emoji.name)
      .setStyle(2)
      .setEmoji(emoji.id)
  );

  const row = new ActionRowBuilder().addComponents(buttons);
  return row
};

const emojiInfo = async (d, emojiID) => {
  const emoji = await d.client.emojis.cache.get(emojiID);

  const info = {
    url: `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}`,
    name: emoji.name,
    id: emoji.id
  };

  return info;
};

const uploadEmoji = async (d, emojiID, i) => {
  const emoji = await d.client.emojis.cache.get(emojiID);


const emojiC = await d.guild.emojis.create({
        attachment: (emoji.url).addBrackets(),
        name: (emoji.name).addBrackets()
})


  if (!emojiC.animated ) { 
    i.reply({content: `${i.user.username} uploaded <${emojiC.animated? 'a': ''}:${emojiC.name}:${emojiC.id}>`})
  } else {
   const rowNew = new ActionRowBuilder().addComponents([
        new ButtonBuilder()
          .setCustomId(`yes_${emojiC.id}`)
          .setLabel('Yes')
          .setStyle(3),
        new ButtonBuilder()
          .setCustomId('no')
          .setLabel('No')
          .setStyle(4)
      ]);
   const k = await i.update({content: `Would you also like to upload a static version of this emoji?
Users without Nitro can use it from the emoji picker to send <a:${emojiC.name}:${emojiC.id}>`, components: [rowNew], embeds: []})
    await i.followUp({content: `${i.user.username} uploaded <${emojiC.animated? 'a': ''}:${emojiC.name}:${emojiC.id}>`})

   const coll=k.createMessageComponentCollector({max: 1})
    coll.on('collect', async (int) => {
      const split3 = (int.customId).split('_')
        if ( split3[0] == 'yes' || split3[0] == 'no' ) {
        if ( split3[0] == 'yes') {
          const emojiS = await d.guild.emojis.create({
             attachment: `https://cdn.discordapp.com/emojis/${split3[1]}.png`,name: emojiC.name})
          await i.followUp({content: `${int.user.username} also uploaded <:${emojiS.name}:${emojiS.id}>`, components: []})
      } else {
          int.update({content: 'aborted!', embeds: [], components: []})
      }
    }
    })
  }

  
};
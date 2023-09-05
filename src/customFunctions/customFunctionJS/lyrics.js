const { EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch");

module.exports = async (d) => {

const data = d.util.aoiFunc(d);
const [name] = data.inside.splits;

const api = `https://api.popcat.xyz/lyrics?song=${encodeURIComponent(name)}`;

try {
const response = await fetch(api);

if (response.ok && response.error == '') {
const lyricsData = await response.json();

const embed = new EmbedBuilder()
 .setTitle(`Song Lyrics - ${lyricsData?.title}`)
 .setDescription(`${lyricsData?.lyrics}`)
 .setAuthor({name: lyricsData?.artist})
 .setThumbnail(`${lyricsData?.image}`)
 .setColor(0xFFFFFF);

d.channel.send({ embeds: [embed] });
} else {
  d.channel.send((await response.json()).error);
}
} catch (error) {
  console.error(error);
}

return {
    code: d.util.setCode(data)
  };
}

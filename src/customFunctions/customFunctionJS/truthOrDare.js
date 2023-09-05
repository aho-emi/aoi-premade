const { EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch");

module.exports = async (d) => {

const data = d.util.aoiFunc(d);
const [type] = data.inside.splits;

const api = `https://apiv1.spapi.online/fun/truthordare`;

try {
const response = await fetch(api);

if (response.ok) {
if ( type.toLowerCase() == 'truth' || type.toLowerCase() == 'dare') {
data.result = (await response.json())[type]
} else {
  data.result = 'Invalid type provided'
}
} else {
  d.channel.send((await response.json()).error);
}
} catch (error) {
}

return {
    code: d.util.setCode(data)
  };
}

const fetch = require('node-fetch')
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [username = d.author.username,
          avatar = d.author.avatarURL()] = data.inside.splits;



  const card = `https://agg-api.vercel.app/boostcard?avatar=${avatar}&username=${username}`

  data.result = card
  
    return {
        code: d.util.setCode(data),
    };
};

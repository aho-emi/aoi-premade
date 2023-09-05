const fetch = require('node-fetch')
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [username,
          xp,
          maxxp,
          level,
          avatar,
          background,
          blur = false,
          xpColor = "FFFFFF",
          fontColor = "FFFFFF",
          bgColor = "000000"] = data.inside.splits;

  if (!username || !xp || !maxxp || !level || !avatar) {
    dd = []
    !username? dd.push('username') : null; !xp? dd.push('xp') : null; !maxxp? dd.push('maxxp') : null; !level? dd.push('level') : null; !avatar? dd.push('avatar') : null;   
    data.result = `Required fields are empty \`${dd.join('`, `')}\``
  } else { 

  const card = `https://agg-api.vercel.app/rankcard?username=${encodeURIComponent(username)}&xp=${xp}&maxxp=${maxxp}&level=${level}&avatar=${avatar}${background? `&background=${background}`: ''}${blur? `&blur=${blur}`: ''}${xpColor? `&xpcolor=${xpColor}`: ''}${fontColor? `&fontcolor=${fontColor}` : ''}${bgColor? `&bgcolor=${bgColor}`: ''}`

  data.result = card
  }
  
    return {
        code: d.util.setCode(data),
    };
};

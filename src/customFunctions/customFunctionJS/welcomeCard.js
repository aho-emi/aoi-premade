const fetch = require('node-fetch')
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [username,
           avatar,
           title ,
           subtitle,
           background] = data.inside.splits;


  if (!username || !avatar) {
    dd = []
    !username? dd.push('username') : null; !avatar? dd.push('avatar') : null;   
    data.result = `Required fields are empty \`${dd.join('`, `')}\``
  } else {
  const card = `https://api.munlai.me/image/welcomecard?image=${avatar}&username=${username}${title? `&title=${encodeURIComponent(title)}`: ''}${subtitle? `&subtitle=${encodeURIComponent(subtitle)}`: ''}${background? `&background=${background}`: ''}`

  data.result = card
  }
  
    return {
        code: d.util.setCode(data),
    };
};

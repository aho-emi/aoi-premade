// Comment function
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [category] = data.inside.splits;

    const {wyr} = require('../../assets/wouldYouRather.js')
  
  const keys = Object.keys(wyr)
  const wouldYou = wyr[keys[Math.floor(Math.random() * keys.length)]]

  data.result = JSON.stringify(wouldYou)

    return {
        code: d.util.setCode(data),
    };
};

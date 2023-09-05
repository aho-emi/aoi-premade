// Comment function
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [category] = data.inside.splits;

    const { images } = require('../../assets/images.js')
  
  
  const link = images[category][Math.floor(Math.random() * images[category].length)]

  data.result = link
  
    return {
        code: d.util.setCode(data),
    };
};

// Comment function
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);


  const {version} = require('../../../package.json')
  data.result = version
    return {
        code: d.util.setCode(data),
    };
};

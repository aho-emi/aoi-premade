module.exports = async (d) => {
  const data = d.util.aoiFunc(d);
  
  data.result = ['heads', 'tails'][Math.floor(Math.random() * 2)];


  return {
    code: d.util.setCode(data),
  };
};

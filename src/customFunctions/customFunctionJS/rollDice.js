module.exports = async (d) => {
  const data = d.util.aoiFunc(d);

  const sides = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  
  function rollDice() {
    return sides[Math.floor(Math.random() * 6)];
  }

  data.result = rollDice();

  return {
    code: d.util.setCode(data),
  };
};

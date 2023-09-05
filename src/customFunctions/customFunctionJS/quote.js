// Comment function
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [] = data.inside.splits;

    const {animeQuote} = require('../../assets/quote.js')
  
  const keys = Object.keys(animeQuote)
  const quiz = animeQuote[keys[Math.floor(Math.random() * keys.length)]]

  data.result = JSON.stringify(quiz)

    return {
        code: d.util.setCode(data),
    };
};

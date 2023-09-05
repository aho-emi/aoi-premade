// Comment function
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [category] = data.inside.splits;

    const {anime} = require('../../assets/quiz.js')
  
  const keys = Object.keys(anime)
  const quiz = anime[keys[Math.floor(Math.random() * keys.length)]]

  data.result = JSON.stringify(quiz)

    return {
        code: d.util.setCode(data),
    };
};

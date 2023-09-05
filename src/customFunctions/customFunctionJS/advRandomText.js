module.exports = async (d) => {
  const data = d.util.aoiFunc(d);
  const [words, numb = 1, allowDuplicates = 'true'] = data.inside.splits;

  if (!words) return;

  const wordArr = words.split(',');
  const num = Math.min(numb, wordArr.length);

  const randWords = [];
  
  for (let i = 0; i < num; i++) {
    let rand = Math.floor(Math.random() * wordArr.length);
    let newRandom = wordArr[rand];

    if (allowDuplicates !== 'true' && randWords.includes(newRandom)) {

      wordArr.splice(rand, 1);
      continue;
    }
    
    randWords.push(newRandom);
    wordArr.splice(rand, 1);
  }
  
  data.result = randWords.join(', ');

  return {
    code: d.util.setCode(data),
  };
};

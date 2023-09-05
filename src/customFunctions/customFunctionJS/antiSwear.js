module.exports = async (d) => {
  const data = d.util.aoiFunc(d);
  const [language ,
         del = false] = data.inside.splits;
  const BadWordsNext = require('bad-words-next');
  const en = require('bad-words-next/data/en.json');
  let badwords = null;

  switch (language) {
    case 'en':
      badwords = new BadWordsNext({ data: en });
      break;
    default:
      badwords = new BadWordsNext({ data: en });
  }

  if (d.message.author.bot === false) { 
    const content = d.message.content.toLowerCase();
    const containsBadWord = badwords.check(content); 

    if (containsBadWord) {
       if (del) {
          d.message.delete()
       }
    }
  }

  return {
    code: d.util.setCode(data),
  };
};

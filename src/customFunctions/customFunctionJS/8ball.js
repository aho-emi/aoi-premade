module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [type = 'random'] = data.inside.splits;

function magic8Ball(type) {
  const res = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "_(Signs point to yes.)_",
    "Reply hazy, try again.",
    "Ask again later.",
    "Absolutely.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
    "In your wildest dreams!",
    "Ha! As if!",
    "Not a chance.",
    "Keep dreaming.",
    "Oh, absolutely not!",
    "Yeah, Yeah... right.",
    "Sure, when pigs fly.",
    "Nice try, but **NO**",
    "Don’t even think about it",
    "You’re kidding right?"
        ];

  const positiveRes = [
    "It is certain.",   
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "_(Signs point to yes.)_",
    "Absolutely."
        ];

  const negativeRes = [
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
    "In your wildest dreams!",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Ha! As if!",
    "Not a chance.",
    "Keep dreaming.",
    "Oh, absolutely not!",
    "Yeah, Yeah... right.",
    "Sure, when pigs fly.",
    "Nice try, but **NO**",
    "Don’t even think about it",
    "You’re kidding right?"
        ];

let filteredRes = [];
  if (type.toLowerCase() === 'positive') {
      filteredRes = positiveRes;
  } else if (type.toLowerCase() === 'negative') {
      filteredRes = negativeRes;
  } else if (type.toLowerCase() === 'random') {
    filteredRes = res;
  }


filteredRes.sort(() => Math.random() - 0.5);
  return filteredRes[Math.floor(Math.random() * filteredRes.length)];
    }

data.result = magic8Ball(type);

return {
  code: d.util.setCode(data),
};
}


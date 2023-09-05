module.exports = async (d) => {
  const data = d.util.aoiFunc(d);
  const [length, type = "random"] = data.inside.splits;
  
  try {
    let characters = '';

    if (type === 'alphabet') {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    } else if (type === 'number') {
        characters = '0123456789';
    } else if (type === 'special') {
        characters = '!@#$%^&*()-_+=<>?';
    } else if (type === 'random') {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=<>?';
    } else {
        d.message.channel.send(`\`\`\`Error: Invalid type. Please use "alphabet", "number", "special", or "random".
Provided In
  {
    Function: "$advRandomString",
  }\`\`\``);
    }

    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    data.result = result;
  } catch (error) {
  }

  return { code: d.util.setCode(data) };
};


module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [strength = "medium"] = data.inside.splits;

function generatePassword(strength, length = 12) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";


  const strengthLevels = {
    weak: {
      minLength: 4,
    },
    medium: {
      minLength: 6,
    },
    strong: {
      minLength: 8,
    },
    superstrong: {
      minLength: 10,
    },
  };

  if (!strengthLevels[strength]) {
    throw new Error("Invalid strength parameter");
  }
  length = strengthLevels[strength].minLength;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }

  return password;
}


data.result = generatePassword(strength);

return {
  code: d.util.setCode(data),
};
}


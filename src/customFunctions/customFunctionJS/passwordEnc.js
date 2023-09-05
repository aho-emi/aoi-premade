
module.exports = async (d) => {
  const data = d.util.aoiFunc(d);
  let [password] = data.inside.splits;
  const crypto = require('crypto');
  salt = "@ho3mi"
    
   function encPassword(pass, salt) {
  const hash = crypto.createHmac('sha256', salt);
  hash.update(pass);
  const hashedPass = hash.digest('hex');
  return hashedPass;
}


data.result = encPassword(password, salt)

    return {
        code: d.util.setCode(data),
    };
};


module.exports = async (d) => {
  const data = d.util.aoiFunc(d);
  let [password,hash] = data.inside.splits;
  const crypto = require('crypto');
  salt = "@ho3mi"
    
   function verify(pass, salt) {
  const hashed = crypto.createHmac('sha256', salt);
  hashed.update(pass);
  const hashedPass = hashed.digest('hex');
  return hashedPass == hash ? true : false;
}


data.result = verify(password, salt)

    return {
        code: d.util.setCode(data),
    };
};

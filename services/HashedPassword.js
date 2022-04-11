const bcrypt = require("bcrypt");

class HashedPassword {
  async hash(password) {
    const salt = await bcrypt.genSalt(10);
    const result = await bcrypt
      .hash(password, salt)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    return result;
  }

  async compare(password, hash) {
    const result = await bcrypt
      .compare(password, hash)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    return result;
  }
}

module.exports = new HashedPassword();

const { User } = require("../../models");
const { HashedPassword } = require("../../services");

class AuthServices {
  async register({ firstName, lastName, email, password }) {
    const hashed_pwd = await HashedPassword.hash(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashed_pwd,
    });
    return user;
  }

  async login({ email, password }) {

    const user = await User.findOne({ where: { email } });

    if (user === undefined || user === null) {
      return {
        isValid: false,
        data: null,
      };
    }
    const isValid = await HashedPassword.compare(password, user.password);
    if (isValid) {
      return {
        isValid,
        data: {
          id: user.id,
          email: user.email,
        },
      };
    } else {
      return {
        isValid,
        data: null,
      };
    }
  }

  async check_token({ id }) {
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ['password']
      }
    });
    return user;
  }
}

module.exports = new AuthServices();

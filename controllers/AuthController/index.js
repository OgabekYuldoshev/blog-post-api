const AuthServices = require("./services");
const { JWToken } = require("../../services");
class AuthController {
  async register(req, res) {
    try {
      const user = await AuthServices.register(req.body);
      res.status(201).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async login(req, res) {
    try {
      const { isValid, data } = await AuthServices.login(req.body);
      if (isValid) {
        const token = await JWToken.getToken(data);
        res.status(200).json({
          token,
        });
      } else {
        res.status(404).send({ msg: "Email or Password is incorrect!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async check_token(req, res) {
    try {
      const user = await AuthServices.check_token({ id: req?.user?.id });
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new AuthController();

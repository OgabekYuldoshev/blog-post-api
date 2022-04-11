const jwt = require("jsonwebtoken");
const { User } = require("../models");

class JWToken {
  async getToken(data) {
    const token = await jwt.sign(data, process.env.PWD, { expiresIn: "1h" });
    return token;
  }

  async checkToken(req, res, next) {
    if (req?.headers?.authorization === undefined) {
      res.status(401).json({ msg: "Unauthorization" });
    } else {
      const token = req?.headers?.authorization?.split(" ");
      if (!token) {
        res.status(401).json({ msg: "Unauthorization" });
      } else {
        await jwt.verify(token[1], process.env.PWD, async (err, decoded) => {
          if (err) {
            res.status(401).json({ msg: "Unauthorization" });
          } else {
            const decode = await jwt.decode(token[1]);
            await User.findOne({ where: { id: decode?.id } })
              .then((result) => {
                req.user = result;
              })
              .catch((error) => {
                console.error(error);
                res.status(500).json(error);
              });
            next();
          }
        });
      }
    }
  }
}

module.exports = new JWToken();

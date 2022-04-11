const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers");
const { JWToken } = require("../services");

router.post("/reg", AuthController.register);
router.post("/login", AuthController.login);
router.get("/check-token", JWToken.checkToken, AuthController.check_token);

module.exports = router;

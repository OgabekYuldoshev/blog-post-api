const express = require("express");
const router = express.Router();
const { PostsController } = require("../controllers");
const { JWToken } = require("../services");

router.post("/", JWToken.checkToken, PostsController.create);
router.put("/:id", JWToken.checkToken, PostsController.update);
router.delete("/:id", JWToken.checkToken, PostsController.delete);
router.get("/list", JWToken.checkToken, PostsController.list);
router.get("/single/:id", JWToken.checkToken, PostsController.single);

module.exports = router;

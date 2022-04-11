const PostsServices = require("./services");

class PostsController {
  async create(req, res) {
    const data = { ...req?.body, author: req?.user?.id };
    try {
      const post = await PostsServices.create(data);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req, res) {
    const data = { ...req?.body, author: req?.user?.id };
    try {
      const post = await PostsServices.update(data, req.params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      const post = await PostsServices.delete(req?.params?.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async single(req, res) {
    try {
      const post = await PostsServices.single(req?.params?.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async list(req, res) {
    try {
      const post = await PostsServices.list(req?.query, req?.user?.id);
      console.log(post);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new PostsController();

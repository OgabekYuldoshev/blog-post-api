const { Post } = require("../../models");

class PostsServices {
  async create(data) {
    const post = await Post.create(data)
      .then(() => {
        return "Post Yaratildi";
      })
      .catch((err) => {
        return err;
      });
    return post;
  }

  async update(data, id) {
    const post = await Post.update(data, { where: { id } })
      .then(() => {
        return "Post o'zgartirildi";
      })
      .catch((err) => {
        return err;
      });
    return post;
  }

  async delete(id) {
    const post = await Post.destroy({
      where: {
        id,
      },
    })
      .then(() => {
        return "Post o'zgartirildi";
      })
      .catch((err) => {
        return err;
      });
    return post;
  }

  async single(id) {
    const post = await Post.findOne({ where: { id } })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    return post;
  }

  async list(params) {
    const post = await Post.findAll({ where: { ...params } })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    return post;
  }
}

module.exports = new PostsServices();

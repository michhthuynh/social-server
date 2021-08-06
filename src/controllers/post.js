const PostModel = require("../models/Post")

module.exports.createPost = async (req, res) => {
  const { description, images } = req.body
  const post = PostModel.create({
    user_created
  })
  res.send('ok')
}
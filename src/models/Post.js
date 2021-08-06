const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  user_created: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true,
  },
  images: {
    type: Array,
    default: []
  },
  comment: {
    type: Array,
    default: []
  },
  reaction: {
    type: Array,
    default: []
  },
},
  { timestamps: true }
)

const PostModel = mongoose.model('Posts', PostSchema)

module.exports = PostModel
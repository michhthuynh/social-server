const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    user_created: {
      type: String,
      required,
    },
    description: {
      type: String,
      default: [],
    },
  },
  { timestamps: true },
);

const CommentModel = mongoose.model('Comments', CommentSchema);

module.exports = CommentModel;

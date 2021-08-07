const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema(
  {
    user_created: {
      type: String,
      required: true,
    },
    icon: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
    type: {
      type: Number,
      enum: [1, 2],
      required: true,
    },
  },
  { timestamps: true },
);

const ReactionModel = mongoose.model('Reactions', ReactionSchema);

module.exports = ReactionModel;

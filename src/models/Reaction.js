const mongoose = require('mongoose')

const ReactionSchema = new mongoose.Schema({
  user_created: {
    type: String,
    require,
  },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 1
  },
},
  { timestamps: true }
)

const ReactionModel = mongoose.model('Reactions', ReactionSchema)

module.exports = ReactionModel
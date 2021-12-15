const mongoose = require("mongoose");

const CommentsReplies = mongoose.model(
  "Comments_replies",
  new mongoose.Schema(
    {
      user_id: mongoose.Schema.Types.ObjectId,
      comments_id: mongoose.Schema.Types.ObjectId,
      comments: String,
      deleted: Boolean
    },
    { timestamps: true }
  )
);

module.exports = CommentsReplies;

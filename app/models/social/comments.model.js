const mongoose = require("mongoose");

const Comments = mongoose.model(
  "Comments",
  new mongoose.Schema(
    {
      user_id: mongoose.Schema.Types.ObjectId,
      status_id: mongoose.Schema.Types.ObjectId,
      comments: String,
      deleted: Boolean
    },
    { timestamps: true }
  )
);

module.exports = Comments;

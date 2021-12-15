const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.status = require("./social/status.model");
db.comments = require("./social/comments.model");
db.commentsReplies = require("./social/comments-replies.model");

db.ROLES = ["user", "admin", "superadmin"];

module.exports = db;
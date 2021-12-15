const mongoose = require("mongoose");
const mainConfig = require("../config/main.config");

//function getUrl(images) {
//  if (images != '') {
//    return mainConfig.baseUrl+'saiki/images/'+this._id+'/'+images;
//  } else {
//    return '';
//  }
//}

//function getUsername(username) {
//  return username.toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase());
//}

var thisSchema = new mongoose.Schema({
    address: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  });

const User = mongoose.model("User", thisSchema);

thisSchema.set('toObject', { getters: true });
thisSchema.set('toJSON', { getters: true });

module.exports = User;

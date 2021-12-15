const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var _getRegister = async (req, res) => {
  //-
  //-------
  const user = new User({
    address: req.body.address,
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.findOne({ name: "user" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      user.roles = [role._id];
      user.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        return _getLogin(req, res);
      });
    });
  });
  //-------
};

var _getLogin = async (req, res) => {
  //-------
  User.findOne({
    address: req.body.address
  })
  .populate("roles", "-__v")
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      //-----------------
      return _getRegister(req, res);
      //-----------------
    } else {
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        address: user.address,
        roles: authorities,
        token: token
      });
    }
  });
  //-------
};

exports._getLogin = _getLogin;
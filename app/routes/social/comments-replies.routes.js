const { authJwt } = require("../../middlewares");
const CtSocial = require("../../controllers/social/comments-replies.controller");
var router = require("express").Router();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post("/", [authJwt.verifyToken], CtSocial.create);
  router.put("/:id", [authJwt.verifyToken], CtSocial.update);
  router.delete("/:id", [authJwt.verifyToken], CtSocial.delete);
  app.use("/api/social/comments-replies", router);

};

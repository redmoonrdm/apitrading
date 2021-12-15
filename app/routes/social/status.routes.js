const { authJwt } = require("../../middlewares");
const CtSocial = require("../../controllers/social/status.controller");
var router = require("express").Router();
const multer = require("multer");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /* start upload images */
  const multerStorage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Not an image! Please upload only images.", false);
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fieldSize: 25 * 1024 * 1024 }
  });

  const uploadImg = upload.fields([
    { name: "img", maxCount: 10 },
  ]);
  /* end upload images */

  router.post("/", [authJwt.verifyToken], uploadImg, CtSocial.resizerImg, CtSocial.create);
  router.get("/", [authJwt.verifyToken], CtSocial.findAll);
  router.get("/unpublish", [authJwt.verifyToken], CtSocial.findAllUnpublished);
  router.get("/:id", [authJwt.verifyToken], CtSocial.findOne);
  router.put("/:id", [authJwt.verifyToken], CtSocial.update);
  router.delete("/:id", [authJwt.verifyToken], CtSocial.delete);
  app.use("/api/social/status", router);

};

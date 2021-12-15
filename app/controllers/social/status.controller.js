const db = require("../../models");
const Qr = db.status;
const MulterSharpResizer = require("multer-sharp-resizer");
//const path = require('path');
//const fs = require('fs');

exports.resizerImg = async (req, res, next) => {
  const filename = {img: `${Date.now()}`};
  const sizes = [{path: "large", width: 600, }, { path: "medium", width: 300, }];
  const uploadPath = `./saiki/images/${req.userId}`;
  const fileUrl = `${req.protocol}://${req.get("host")}/saiki/images/${req.userId}`;
  const sharpOptions = {};
  const resizeObj = new MulterSharpResizer(req, filename, sizes, uploadPath, fileUrl, sharpOptions );

  await resizeObj.resize();
  const getDataUploaded = resizeObj.getData();
  req.body.img = getDataUploaded.img;
  next();
};

exports.create = async (req, res, next) => {
    const files = req.body.img;
    let index, len;
    let photo1 = '';
    let photo2 = '';
    let photo3 = '';
    let photo4 = '';
    let photo5 = '';
    let photo6 = '';
    let photo7 = '';
    let photo8 = '';
    let photo9 = '';
    let photo10 = '';

    for (index = 0, len = files.length; index < len; ++index) {
      if (index == 0) { photo1 += files[index].medium.filename; }
      if (index == 1) { photo2 += files[index].medium.filename; }
      if (index == 2) { photo3 += files[index].medium.filename; }
      if (index == 3) { photo4 += files[index].medium.filename; }
      if (index == 4) { photo5 += files[index].medium.filename; }
      if (index == 5) { photo6 += files[index].medium.filename; }
      if (index == 6) { photo7 += files[index].medium.filename; }
      if (index == 7) { photo8 += files[index].medium.filename; }
      if (index == 8) { photo9 += files[index].medium.filename; }
      if (index == 9) { photo10 += files[index].medium.filename; }
    }

    const createNew = new Qr({
      user_id: req.userId,
      status: req.body.status,
      photo1: photo1,
      photo2: photo2,
      photo3: photo3,
      photo4: photo4,
      photo5: photo5,
      photo6: photo6,
      photo7: photo7,
      photo8: photo8,
      photo9: photo9,
      photo10: photo10,
      published: req.body.published ? req.body.published : true,
      deleted: false
    });

    createNew.save(createNew).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while creating the data." });
    });
};

exports.findAll = (req, res) => {
  if (res.status(200)) {
    const status = req.query.status;
    var condition = status ? { status: { $regex: new RegExp(status), $options: "i" }, deleted: false, published: true } : { deleted: false, published: true };

    Qr.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving data." });
    });
  }
};

exports.findOne = (req, res) => {
  if (res.status(200)) {
    const id = req.params.id;
    Qr.find({ _id: id, deleted: false })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found with id " + id });
      else res.send(data);
    })
    .catch(err => {res
      .status(500)
      .send({ message: "Error retrieving with id=" + id });
    });
  }
};

exports.update = (req, res) => {
  if (res.status(200)) {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    const id = req.params.id;

    Qr.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update data with id=${id}. Maybe data was not found!`
        });
      } else res.send({ message: "Data was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating data with id=" + id });
    });
  }
};

exports.delete = (req, res) => {
  if (res.status(200)) {
    const id = req.params.id;

    Qr.findByIdAndUpdate(id, { deleted:true }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update data with id=${id}. Maybe data was not found!`
        });
      } else res.send({ message: "Data was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating data with id=" + id
      });
    });
  }
};

exports.findAllUnpublished = (req, res) => {
  if (res.status(200)) {
    Qr.find({ deleted: false, published: false })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({message: err.message || "Some error occurred while retrieving data."});
    });
  }
};
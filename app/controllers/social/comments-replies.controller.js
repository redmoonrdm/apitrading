const db = require("../../models");
const Qr = db.commentsReplies;

exports.create = (req, res) => {
  if (res.status(200)) {
    if (!req.body.comments_id || !req.body.comments) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const createNew = new Qr({
      user_id: req.userId,
      comments_id: req.body.status_id,
      comments: req.body.comments,
      deleted: false
    });

    createNew
    .save(createNew)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the data."
      });
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
      res.status(500).send({
        message: "Error updating data with id=" + id
      });
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

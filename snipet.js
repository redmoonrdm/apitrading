//-------------------------- Json handle raw data
if (res.status(200)) {
  if (!req.body.status) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
}
//-------------------------- Upload single image
let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('photo');
upload(req, res, function(err) {
  // req.file contains information of uploaded file
  // req.body contains information of text fields, if there were any
  if (req.fileValidationError) {
    //return res.send(req.fileValidationError);
  } else if (!req.file) {
    //return res.send('Please select an image to upload');
  } else if (err instanceof multer.MulterError) {
    //return res.send(err);
  } else if (err) {
    //return res.send(err);
  }
  res.send(`You have uploaded this image: ${req.file.path}`);
});
//-------------------------- Upload multiple
// 10 is the limit I've defined for number of uploaded files at once
// 'multiple_images' is the name of our file input field
let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('photos', 10);
upload(req, res, function(err) {
  if (req.fileValidationError) {
    //return res.send(req.fileValidationError);
  } else if (!req.file) {
    //return res.send('Please select an image to upload');
  } else if (err instanceof multer.MulterError) {
    //return res.send(err);
  } else if (err) {
    //return res.send(err);
  }
  let result = "";
  const files = req.files;
  let index, len;
  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += files[index].path;
  }
  res.send(result);
});
//-------------------------- Save to mongose
const createNew = new Qr({
  user_id: req.userId,
  status: req.status,
  published: req.published ? req.published : true,
  deleted: false
});
createNew.save(createNew).then(data => {
  res.send(data);
}).catch(err => {
  res.status(500).send({ message: err.message || "Some error occurred while creating the data." });
});
//-------------------------- 

//-------------------------- 

//-------------------------- 

//-------------------------- 

//-------------------------- 

//-------------------------- 

//-------------------------- 

//-------------------------- 
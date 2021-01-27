const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

var app = express();

// https://stackabuse.com/handling-cors-with-node-js/
app.use(cors());

app.use(formidable());

app.post("/post", (req, res) => {
  //req.fields contains non-file fields
  //req.files contains files
  // res.send(JSON.stringify(req.fields));
  let j = req.fields.data;
});

app.listen(2020, () => {
  console.log("server is listening on port 2020");
});

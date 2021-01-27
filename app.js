const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const fs = require("fs");

var app = express();

// https://stackabuse.com/handling-cors-with-node-js/
app.use(cors());

app.use(formidable());

app.post("/post", (req, res) => {
  //req.fields contains non-file fields
  //req.files contains files
  console.log(`Received data from ${req.headers.origin}...`);
  let data = req.fields.data;
  fs.writeFile("./data.json", data, (err) => {
    if (err) throw err;
    console.log("Saved JSON file...");
  });
});

app.listen(2020, () => {
  console.log("server is listening on port 2020");
});

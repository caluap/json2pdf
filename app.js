const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

var app = express();

// https://stackabuse.com/handling-cors-with-node-js/
app.use(cors());

app.use(formidable());

app.post("/post", (req, res) => {
  //req.fields contains non-file fields
  //req.files contains files
  console.log(`Received data from ${req.headers.origin}...`);
  let data = req.fields.data;

  // https://stackabuse.com/reading-and-writing-json-files-with-node-js/
  fs.writeFile("./data.json", data, (err) => {
    if (err) throw err;
    console.log("Saved JSON file...");

    // https://stackabuse.com/executing-shell-commands-with-node-js/#:~:text=Conclusion-,Node.,be%20available%20via%20event%20listeners.
    exec("ls -l data.json", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  });
});

app.listen(2020, () => {
  console.log("server is listening on port 2020");
});

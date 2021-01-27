const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

var app = express();

// https://stackabuse.com/handling-cors-with-node-js/
app.use(cors());
app.use(formidable());
// app.use(express.static("./"));

app.post("/post", (req, res) => {
  //req.fields contains non-file fields
  //req.files contains files
  console.log(`Received data from ${req.headers.origin}...`);
  let data = req.fields;

  // https://stackabuse.com/reading-and-writing-json-files-with-node-js/
  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("Saved JSON file...");

    // https://stackabuse.com/executing-shell-commands-with-node-js/#:~:text=Conclusion-,Node.,be%20available%20via%20event%20listeners.
    // let command = `java -jar /Users/calua/repositorios/processing.py-3017-macosx/processing-py.jar json2pdf.py`;
    let command =
      "processing-java --sketch=/Users/calua/repositorios/json2pdf --run";

    exec(command, (error, stdout, stderr) => {
      if (error) {
        // console.log(`error: ${error.message}`);
      }
      if (stderr) {
        // console.log(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      res.sendFile("/Users/calua/repositorios/json2pdf/output.pdf");
    });
  });
});

app.listen(2020, () => {
  console.log("server is listening on port 2020");
});

const { error } = require("console");
const fs = require("fs");
const path = require('path');

function copyDir() {
  fs.mkdir("./04-copy-directory/files-copy", { recursive: true }, (err) => {
    if (err) throw err;
  })
  
  fs.cp("./04-copy-directory/files", "./04-copy-directory/files-copy",{ recursive: true }, (err) => {
    if (err) throw error;
  })
}

copyDir()


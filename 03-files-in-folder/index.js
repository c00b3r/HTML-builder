const fs = require('fs'); 
const path = require('path'); 
const dirname = "./03-files-in-folder/secret-folder"
const {size} = fs.statSync('./03-files-in-folder/secret-folder');

fs.readdir(dirname,{ withFileTypes: true }, (err, files) => { 
  if (err) 
    console.log(err); 
  else { 
    const filesNames = files
        .filter(files => files.isFile())
        .map(files => files.name);
    console.log("\nCurrent directory filenames:"); 
    files.forEach(filesNames => { 
      const stats = fs.stat(`./03-files-in-folder/secret-folder/${filesNames.name}`, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(path.parse(filesNames.name).name, "-", path.parse(filesNames.name).ext, "-", stats.size / 1000 + 'kb');
      });
    }) 
  } 
}) 

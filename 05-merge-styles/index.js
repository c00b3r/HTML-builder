const fs = require('fs').promises;
const path = require('path');

let combinedContent = '';

fs.readdir('./05-merge-styles/styles')
  .then(files => {
    const readFilePromises = files.map(file => {
      if (file.includes('css')) {
        return fs.readFile(path.join('./05-merge-styles/styles', file), 'utf8');
      }
      return Promise.resolve();
    });

    return Promise.all(readFilePromises);
  })
  .then(contents => {
    combinedContent = contents.join('\n');
    return fs.writeFile('./05-merge-styles/project-dist/bundle.css', combinedContent, 'utf8');
  })
  .then(() => {
  })
  .catch(err => {
    console.error(err);
  });
const fs = require('fs');
const path = require('path');

let combinedContent = '';
const regex = /\{\{(.+?)\}\}/;


fs.mkdir('./06-build-page/project-dist', { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

fs.readFile('./06-build-page/template.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const assetNames = ["{{header}}", "{{articles}}", "{{footer}}"];

  const readFilePromises = assetNames.map((elem) => {
    const matchResult = elem.match(regex);
    if (matchResult) {
      const fileName = matchResult[1];
      return fs.promises.readFile(`./06-build-page/components/${fileName}.html`, 'utf8');
    } else {
      return Promise.resolve('');
    }
  });


  Promise.all(readFilePromises)
    .then((replacementContents) => {
      assetNames.forEach((elem, index) => {
        data = data.replace(elem, replacementContents[index]);
      });

      // Теперь 'data' содержит обновленное содержимое файла
      fs.writeFile('./06-build-page/project-dist/index.html', data, 'utf8', (err) => {
        if (err) {
          console.error(err);
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

function readStyles(callback) {
  const stylesPath = './06-build-page/styles'

  fs.readdir(stylesPath, (err, files) => {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }

    const cssFiles = files.filter(file => file.endsWith('.css'));

    const readFileContents = (file, cb) => {
      const filePath = path.join(stylesPath, file);
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          console.error(err);
          cb(err);
          return;
        }
        cb(null, content);
      });
    };

    const contents = [];

    const processFile = index => {
      if (index === cssFiles.length) {
        const combinedContent = contents.join('\n');
        const outputPath =  './06-build-page/project-dist/style.css'

        fs.writeFile(outputPath, combinedContent, 'utf8', (err) => {
          if (err) {
            console.error(err);
            callback(err);
          } else {
            callback(null);
          }
        });
      } else {
        readFileContents(cssFiles[index], (err, content) => {
          if (!err) {
            contents.push(content);
          }
          processFile(index + 1);
        });
      }
    };
    processFile(0);
  });
}

readStyles((err) => {
  if (err) {
    console.error(err);
  }
});

const sourcePath = './06-build-page/assets';
const destinationPath = './06-build-page/project-dist/assets';
function copyFolderSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

copyFolderSync(sourcePath, destinationPath);



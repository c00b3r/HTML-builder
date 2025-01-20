const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, {
    withFileTypes: true
}, (error, files) => {
    if (error) console.log(error.message);

    files.forEach((file) => {
        if (file.isFile()) {
            const pathFile = path.join(folderPath, file.name);
            const fileExtension = path.extname(pathFile).replace('.', '');
            const fileName = file.name.replace('.' + fileExtension, '');

            fs.stat(pathFile, (error, stats) => {
                if (error) {
                    console.log(error.message);
                } else {
                    console.log(`${fileName} - ${fileExtension} - ${stats.size / 1000 } kb`);
                }
            })
        }
    })
})

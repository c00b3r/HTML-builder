const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function displayFileInfo() {
    try {
        const files = await fs.readdir(folderPath, { withFileTypes: true });
        for (const file of files) {
            if (file.isFile()) {
                const fileExtension = path.extname(file.name).slice(1); 

                const filePath = path.join(folderPath, file.name);
                const stats = await fs.stat(filePath);

                console.log(`${file.name} - ${fileExtension} - ${stats.size / 1000 } kb`);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

displayFileInfo();
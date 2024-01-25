const fs = require('fs');
const path = require('path');

function copyDir() {
    const sourcePath = path.join(__dirname, 'files');
    const destinationPath = path.join(__dirname, 'files-copy');
    fs.access(destinationPath, fs.constants.F_OK, (accessErr) => {
        const destinationFolderExists = !accessErr;
        if (!destinationFolderExists) {
            fs.mkdir(destinationPath, { recursive: true }, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        }

        fs.readdir(sourcePath, (err, sourceFiles) => {
            if (err) {
                console.error(err);
                return;
            }

            fs.readdir(destinationPath, (err, destFiles) => {
                if (err) {
                    console.error(err);
                    return;
                }

                destFiles.forEach((destFile) => {
                    if (!sourceFiles.includes(destFile)) {
                        const destFilePath = path.join(destinationPath, destFile);

                        fs.unlink(destFilePath, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                });
                sourceFiles.forEach((file) => {
                    const sourceFilePath = path.join(sourcePath, file);
                    const destinationFilePath = path.join(destinationPath, file);

                    fs.readFile(sourceFilePath, (err, fileContent) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        fs.writeFile(destinationFilePath, fileContent, (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    });
                });
            });
        });
    });
}
copyDir();
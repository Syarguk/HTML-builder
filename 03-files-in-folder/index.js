const fs = require('fs');
const path = require('path');
const pathSecret = path.join(__dirname, 'secret-folder');
const {stdout} = process;

(async function readCat(pathDir) {
    const files = await fs.promises.readdir(pathDir);
    for (let file of files) {
        const stats = await fs.promises.stat(path.join(pathDir, file));
        if (stats.isFile()) {
            stdout.write(`${file.slice(0, file.indexOf("."))} - ${file.slice(file.indexOf(".") + 1)} - ${stats.size / 1000}kb\n`);
        }
    }
})(pathSecret);
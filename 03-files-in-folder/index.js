const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'secret-folder');
const {stdout} = process;

fs.readdir(pathFile,  {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    for (let elem of files) {
        let elName = path.parse(elem.name);
        let pathEl = path.join(pathFile, elem.name);
        if(elem.isFile()) {
            fs.stat(pathEl, (err, stats) => {
                if (err) throw err;
                stdout.write(`${elName.name} - ${elName.ext.slice(1)} - ${stats.size / 1000}kb\n`);
            });
        }
    }
});
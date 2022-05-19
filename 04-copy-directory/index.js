const fs = require('fs');
const path = require('path');
const pathSourceDir = path.join(__dirname, 'files');

fs.stat(path.join(__dirname, 'files-copy'), (err) => {
    if (err) {/* throw err; */}
    else { const pathDir = path.join(__dirname, 'files-copy');
        fs.readdir(pathDir, (err, files) => {
            if (err) throw err;
            let arrFiles = [];
            files.forEach(file => { arrFiles.push(file)});
            arrFiles.forEach(file => {
                fs.unlink(path.join(pathDir, file), err => {if (err) throw err});
            })
        })
    }
});
fs.readdir(pathSourceDir, (err, files) => {
    if (err) throw err;
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
        if (err) throw err;
        files.forEach(file => {
            fs.copyFile(path.join(pathSourceDir, file), path.join(__dirname, 'files-copy', file), () => {
            });
        })
    }
)});
const fs = require('fs');
const path = require('path');
const pathDirProject = path.join(__dirname, 'project-dist');
const pathDirStyles = path.join(__dirname, 'styles');

fs.writeFile(path.join(pathDirProject, 'bundle.css'), "", (err) => { if(err) throw err});
fs.readdir(pathDirStyles, (err, files) => {
    if (err) {console.log(err);}
    else {files.forEach(file => {
        if (file.includes("css")) {
            fs.readFile(path.join(pathDirStyles, file), (err, data) => {
                if (err) console.log(err);
                else {
                    fs.appendFile(
                        path.join(pathDirProject, 'bundle.css'),
                        "\n" + data.toString(),
                        err => {if (err) throw err}
                    );
                }
            });
        }
    })};
})
const fs = require('fs')
const path = require('path');
const pathComp = path.join(__dirname, 'components');
const pathStyl = path.join(__dirname, 'styles');
const pathAss = path.join(__dirname, 'assets');

fs.mkdir(path.join(__dirname, 'project-dist'), err => {
    if (err) clearFiles(path.join(__dirname, 'project-dist'));
});
function clearFiles(path) {
    fs.promises.readdir(path, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            fs.stat(path.join(path, stats), errSt => {
                if (errSt) throw errSt;
                if (stats.isDirectory()) {
                    clearFiles(path.join(path, file));
                } else {
                    fs.unlink(path.join(path, file), err => {if (err) throw err});
                }
            });
        });
    });
}
fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
    if(err) throw err;
    let template = data.toString();
    fs.readdir(pathComp, (err, files) => {
        if(err) throw err;
        files.forEach(file => {
            let nameFile = file.slice(0, file.indexOf("."));
            fs.readFile(path.join(pathComp, file), (err, dataCom) => {
                if(err) throw err;
                template = template.replace("{{" + nameFile + "}}", dataCom.toString());
                fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, err => {
                    if (err) throw err;
                });
            })
        })
    })
});
fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), "", (err) => { if(err) throw err});
fs.readdir(pathStyl, (err, files) => {
    if (err) {console.log(err);}
    else {files.forEach(file => {
        if (file.includes("css")) {
            fs.readFile(path.join(pathStyl, file), (err, data) => {
                if (err) console.log(err);
                else {
                    fs.appendFile(
                        path.join(__dirname, 'project-dist', 'style.css'),
                        "\n" + data.toString(),
                        err => {if (err) throw err}
                    );
                }
            });
        }
    })};
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {if (err) throw err});
fs.readdir(pathAss, {withFileTypes: true}, (err, dirs) => {
    if (err) throw err;
    for (let dir of dirs) {
        let pathDir = path.join(pathAss, dir.name);
        const pathProdAss = path.join(__dirname, 'project-dist', 'assets');
        fs.mkdir(path.join(pathProdAss, dir.name), { recursive: true }, err => {
            if(err) throw err;
            fs.readdir(pathDir, (err, files) => {
                if (err) throw err;
                for (let file of files) {
                    fs.copyFile(path.join(pathAss, dir.name, file), path.join(pathProdAss, dir.name, file), err => {
                        if (err) throw err;
                    });
                }
            });
        });
    }
});

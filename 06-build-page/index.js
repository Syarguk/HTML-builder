const fs = require('fs');
const path = require('path');
const pathSoursAss = path.join(__dirname, 'assets');
const pathTargAss = path.join(__dirname, 'project-dist', 'assets');
const pathSoursCss = path.join(__dirname, 'styles');
const pathTargetCssBundle = path.join(__dirname, 'project-dist', 'style.css');
const pathComponents = path.join(__dirname, 'components');
const pathTargetIndex = path.join(__dirname, 'project-dist', 'index.html');

copyPastDirectory(pathSoursAss, pathTargAss);
async function copyPastDirectory(source, target) {
    await fs.promises.mkdir(target, { recursive: true });
    const filesTar = await fs.promises.readdir(target);
    for (let fileT of filesTar) {
        const status = await fs.promises.stat(path.join(target, fileT));
        if (status.isFile()) await fs.promises.unlink(path.join(target, fileT));
    }
    const filesSour = await fs.promises.readdir(source);
    for (let file of filesSour) {
        const stats = await fs.promises.stat(path.join(source, file));
        if (stats.isDirectory()) {
            await copyPastDirectory(path.join(source, file), path.join(target, file));
        } else {
            await fs.promises.copyFile(path.join(source, file), path.join(target, file));
        }
    }
}

createCssBundle(pathSoursCss, pathTargetCssBundle);
async function createCssBundle(pathSource, pathTarget) {
    const files = await fs.promises.readdir(pathSource);
    await fs.promises.writeFile(pathTarget, "");
    for (let file of files) {
        let data = await fs.promises.readFile(path.join(pathSource, file));
        await fs.promises.appendFile(path.join(pathTarget), data.toString() + "\n");
    }
}

createIndexFile(pathComponents, pathTargetIndex);
async function createIndexFile(pathSource, pathTarget) {
    let dataSource = await fs.promises.readFile(path.join(__dirname, 'template.html'));
    const files = await fs.promises.readdir(pathSource);
    for (let file of files) {
        let nameFile = file.slice(0, file.indexOf("."));
        let data = await fs.promises.readFile(path.join(pathSource, file));
        dataSource = dataSource.toString().replace("{{" + nameFile + "}}", data.toString());
    }
    await fs.promises.writeFile(pathTarget, dataSource);
}
// end :-)
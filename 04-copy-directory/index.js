const fs = require('fs');
const path = require('path');
const pathSourceDir = path.join(__dirname, 'files');
const pathTargetDir = path.join(__dirname, 'files-copy');

copyDirectory(pathSourceDir, pathTargetDir);
async function copyDirectory(source, target) {
    await fs.promises.mkdir(target, { recursive: true });
    const filesTarg = await fs.promises.readdir(target);
    for (let fileT of filesTarg) {
        await fs.promises.unlink(path.join(target, fileT));
    }
    const filesSour = await fs.promises.readdir(source);
    for (let fileS of filesSour) {
        await fs.promises.copyFile(path.join(source, fileS), path.join(target, fileS));
    }
}
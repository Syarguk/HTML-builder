const fs = require('fs');
const path = require('path');
const pathTarget = path.join(__dirname, 'project-dist', 'bundle.css');
const pathSource = path.join(__dirname, 'styles');

createBundle(pathSource, pathTarget);
async function createBundle(source, target) {
    await fs.promises.writeFile(target, "");
    const files = await fs.promises.readdir(source);
    for (let file of files) {
        if (file.includes("css")) {
            let data = await fs.promises.readFile(path.join(source, file));
            await fs.promises.appendFile(target, data.toString() + "\n");
        }
    }
}
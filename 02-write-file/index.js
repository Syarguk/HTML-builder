const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
fs.writeFile(path.join(__dirname, 'mynotes.txt'), "", (err) => {if (err) throw err});
stdout.write('Input anything text, please.\n');
stdin.on('data', data => {
    let strData = data.toString();
    if (strData.trim() == 'exit') { process.exit();}
    else {fs.appendFile(path.join(__dirname, 'mynotes.txt'), data, (err) => {if (err) throw err})};
});
process.on('exit', () => stdout.write('Thank you. Goodbye.\n'));
process.on('SIGINT', () => process.exit());
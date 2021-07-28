const path = require('path');
const fs = require('fs');
const readline = require('readline');
const replace = require('replace-in-file');

// Update index.js with functions
function update() {
    const src = fs.readdirSync('./src');
    const lines = []; 

    const lr = fs.readFileSync('./index.js', 'utf-8').split(/\r?\n/).forEach(function(line){
        lines.push(line)
    })

    src.forEach((dir) => {
        const files = fs.readdirSync(`./src/${dir}`);
        files.forEach((file) => {
            const path = `./src/${dir}/${file}`;
            const func = file.replace('.js', '');
            if ((!lines.find((line) => new RegExp(path).test(line))) && (!lines.find((line) => /\n/.test(line))) ) {
                fs.appendFileSync('./index.js', `export { default as ${func} } from "${path}";\n`);
            }
        })
    })
}

update();
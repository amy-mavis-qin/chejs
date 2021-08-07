const fs = require('fs');
const units = require('./definitions/units.json');

function variableInput(input) {
    const value = /[0-9]{1,}/.exec(input);
    const unit = input.replace(value, '');
    return [value, unit];
};

function readLines(path) {
    const lines = []; 

    fs.readFileSync(path, 'utf-8').split(/\r?\n/).forEach((line) => {
        lines.push(line);
    });
    return lines;
}

module.exports = {
    readLines,
    variableInput
};
const fs = require("fs");

function variableInput(input) {
    input = input.replace(' ', '')
    const value = /[0-9]{1,}\.?[0-9]{0,}/.exec(input);
    const unit = input.replace(value, "");
    if (!unit) {
        throw "Missing units!";
    }
    if (!value) {
        throw "Missing value!";
    }
    return [parseFloat(value), unit.toLowerCase()];
}

function readLines(path) {
    const lines = [];

    fs.readFileSync(path, "utf-8")
        .split(/\r?\n/)
        .forEach((line) => {
            lines.push(line);
        });
    return lines;
}

function validateArrayLength(array1, array2) {
    if (array1.length !== array2.length) {
        throw new Error("The arrays you entered are of different lengths");
    }
}

module.exports = {
    readLines,
    variableInput,
    validateArrayLength,
};

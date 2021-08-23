const { variableInput, readLines } = require('./util.js')
const path = require('path');

function antoineCalculations(molecule, input) {
    let Pvap, T;

    const filename = path.resolve(__dirname + '/definitions/antoine_constants.js');
    const antoineConstants = readLines(filename);
    const moleculeRegex = new RegExp(molecule);
    const currentLine = antoineConstants.find((constant) => moleculeRegex.test(constant));
    let a, b, c;
    if (currentLine) {
        const constants = JSON.parse(currentLine.replace(/]},/, ']}'));
        a = constants['value'][0];
        b = constants['value'][1];
        c = constants['value'][2];
    } else {
        console.log(`Could not find antoine\'s constants for ${molecule}. Please see antoine_constants.js for support.`);
        return;
    }

    input = variableInput(input);
    const units = input[1].toLowerCase();
    if (units === 'k' || units === 'f') {
        T = tempConvert(input[0][0], units, 'c');
        Pvap = Math.pow(10, (a - (b / (T + c))));
        return([Pvap, 'mmhg']);
    } else if (units === 'c') {
        T = input[0][0];
        Pvap = Math.pow(10, (a - (b / (T + c))));
        return([Pvap, 'mmhg']);
    } else if (units !== 'mmhg') {
        Pvap = unitConvert(input[0][0], input[1], "mmhg");
        T = b /( a - Math.log10(Pvap)) - c;
        return([T, 'c']);
    } else if (units === 'mmhg') {
        Pvap = input[0][0];
        T = b /( a - Math.log10(Pvap)) - c;
        return([T, 'c']);
    } else {
        throw new Error('Invalid input')
    }
}

module.exports = {
    antoineCalculations
};
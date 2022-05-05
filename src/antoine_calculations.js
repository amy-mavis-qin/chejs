const { variableInput, readLines } = require('./util.js')
const { antoine_constants } = require('./definitions/antoine_constants')

function antoineCalculations(molecule, input) {
    let Pvap, T;

    const consts = antoine_constants.find(({name}) => name === molecule)

    console.log(consts)
    let a, b, c;
    if (consts) {
        a = consts['value'][0];
        b = consts['value'][1];
        c = consts['value'][2];
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
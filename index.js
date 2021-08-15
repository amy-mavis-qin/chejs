const units = require('./definitions/units.json');
const elements = require('./definitions/element_mass_properties.js');
const heatCapacityConstants = require('./definitions/heat_capacity_constants.json');

const { variableInput, readLines } = require('./util.js')

function unitConvert(input, inputUnit, outputUnit){
    // Validate input
    let validInput = false;
    let validOutput = false;
    let inputType, outputType;
    for (const type of Object.entries(units)) {
        if (units[type[0]][inputUnit]) {
            inputType = type[0];
            validInput = true;
        }
        if (units[type[0]][outputUnit]) {
            outputType = type[0];
            validOutput = true;
        }
    }
    if (!validInput || !validOutput || (!validInput && !validOutput)) {
        console.log('Invalid units. Please check units.json for supported units.');
        return;
    }
    if (inputType !== outputType) {
        console.log('Invalid conversion. Please make sure input unit type is the same as the output unit type.');
        return;
    }

    return convertedValue = input * (units[inputType][outputUnit] / units[outputType][inputUnit]);
}

function tempConvert(input, inputUnit, outputUnit){
    inputUnit = inputUnit.toLowerCase();
    outputUnit = outputUnit.toLowerCase();

    let convertedValue;
    if(inputUnit == 'c' && outputUnit == 'f'){
        convertedValue = (input * (9/5)) + 32;
    } else if (inputUnit == 'f' && outputUnit == 'c') {
        convertedValue = (input - 32) * (5/9); 
    } else if (inputUnit == 'c' && outputUnit == 'k') {
        convertedValue = input + 273;
    } else if (inputUnit == 'k' && outputUnit == 'c') {
        convertedValue = input - 273;
    } else if (inputUnit == 'f' && outputUnit == 'k') {
        convertedValue = (input + 459.67) * (5/9);
    } else if (inputUnit == 'k' && outputUnit == 'f') {
        convertedValue = (input * (9/5)) - 459.67;
    } else {
        console.log('Invalid units. Please use c, f, or k.');
        return;
    }
    return convertedValue;
}

function molarMass(formula){
    let molarMass = 0;
    const elementArray = formula.split(/(?=[A-Z])/);
    let foundElement = false;
    for (const i in elements) {
        for (var j in elementArray) {
            if (elements[i].symbol == elementArray[j]) {
                molarMass = molarMass + elements[i].mass;
                foundElement = true;
            }
            if (/\d/.test(elementArray[j])) {
                var subscript = parseFloat((elementArray[j].match(/\d+/))[0], 10);
                var element = elementArray[j].replace(subscript,'');
                if(subscript !== 0 && elements[i].symbol == element){
                    molarMass = molarMass + (subscript * elements[i].mass)
                } 
            }
        }
    }
    if (!foundElement) {
        console.log('Could not recognize one or more elements.');
        return;
    }
    return molarMass.toFixed(4);
}

function antoineCalculations(molecule, input) {
    let result = [];
    let Pvap, T;

    const antoineConstants = readLines('./definitions/antoine_constants.js');
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

function heatCapacityFromConstants(compound, state, temperature) {
    const minTemp = heatCapacityConstants[compound][state]['minT'];
    const maxTemp = heatCapacityConstants[compound][state]['maxT'];

    if (temperature <= minTemp || temperature >= maxTemp) {
        throw new Error('Temperature not within range.')
    }
    if (heatCapacityConstants[compound][state]) {
        const a = heatCapacityConstants[compound][state]['a'] ? heatCapacityConstants[compound][state]['a'] * Math.pow(10, -3) : 0;
        const b = heatCapacityConstants[compound][state]['b'] ? heatCapacityConstants[compound][state]['b'] * Math.pow(10, -5) : 0;
        const c = heatCapacityConstants[compound][state]['c'] ? heatCapacityConstants[compound][state]['c'] * Math.pow(10, -8) : 0;
        const d = heatCapacityConstants[compound][state]['d'] ? heatCapacityConstants[compound][state]['d'] * Math.pow(10, -12) : 0;

        if (heatCapacityConstants[compound][state]['form'] === 1) {
            return a + (b * temperature) + (c * Math.pow(temperature, 2) + (d * Math.pow(temperature, 3)));
        } else {
            return a + (b * temperature) + (c * Math.pow(temperature, -2));
        }
    } else {
        throw new Error('Unsupported state.')
    }
}

module.exports = {
    unitConvert,
    tempConvert,
    molarMass,
    antoineCalculations,
    heatCapacityFromConstants
};
const units = require("./definitions/units.json");

function unitConvert(input, inputUnit, outputUnit) {
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
        console.log("Invalid units. Please check units.json for supported units.");
        return;
    }
    if (inputType !== outputType) {
        console.log(
            "Invalid conversion. Please make sure input unit type is the same as the output unit type."
        );
        return;
    }

    return (convertedValue = input * (units[inputType][outputUnit] / units[outputType][inputUnit]));
}

function tempConvert(input, inputUnit, outputUnit) {
    inputUnit = inputUnit.toLowerCase();
    outputUnit = outputUnit.toLowerCase();

    if (inputUnit == outputUnit) {
        return input;
    }

    let convertedValue;
    if (inputUnit == "c" && outputUnit == "f") {
        convertedValue = input * (9 / 5) + 32;
    } else if (inputUnit == "f" && outputUnit == "c") {
        convertedValue = (input - 32) * (5 / 9);
    } else if (inputUnit == "c" && outputUnit == "k") {
        convertedValue = input + 273;
    } else if (inputUnit == "k" && outputUnit == "c") {
        convertedValue = input - 273;
    } else if (inputUnit == "f" && outputUnit == "k") {
        convertedValue = (input + 459.67) * (5 / 9);
    } else if (inputUnit == "k" && outputUnit == "f") {
        convertedValue = input * (9 / 5) - 459.67;
    } else {
        console.log("Invalid units. Please use c, f, or k.");
        return;
    }
    return convertedValue;
}

module.exports = {
    unitConvert,
    tempConvert,
};

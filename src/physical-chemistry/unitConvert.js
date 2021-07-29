const { units } = require('../definitions/units.js');
const { variableInput } = require('./util.js');

function unitConvert(input,outputUnit){
    try{
        var inputValue, inputUnit;
        outputUnit = outputUnit.toLowerCase();
        input = input.replace(/\s/g,"");
        input = Object.values(variableInput(input))
        inputValue = input[0][0];
        inputUnit = input[0][1];
        inputUnit = inputUnit.toLowerCase();
        outputUnit = outputUnit.toLowerCase();    
        for(var i=0; i<(Object.entries(units).length); i++){
            var properties = Object.entries(units)[i][1]
            if (properties[inputUnit] && properties[outputUnit]){
                var convertedValue = inputValue* (properties[outputUnit]/properties[inputUnit]);
                // Validate Script
                if (inputValue === (convertedValue * properties[inputUnit]/properties[outputUnit])) {
                    return(convertedValue);
                }
            };
        };
    } catch (err) {
        throw new Error(err);
    }
};



module.exports = {
    unitConvert
};
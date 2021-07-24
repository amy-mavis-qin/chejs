var units = require('../definitions/units.js');
units = units.units;

function variableInput() {
    try{
        var parsedObj = {}
        var k=1;
        for (i=0;i<arguments.length;i++){
            var knownValue = parseFloat((arguments[i].match(/\d+/))[0], 10);
            var unit = arguments[i].replace(knownValue,"").toLowerCase();
            var unitObj = Object.entries(units)
            for(var i=0; i<(unitObj.length); i++){
                if(unit in unitObj[i][1] && !parsedObj[unitObj[i][0]]){
                    parsedObj[unitObj[i][0]]=[knownValue,unit];
                    break;
                } else if (unit in unitObj[i][1] && parsedObj[unitObj[i][0]]){
                    parsedObj[unitObj[i][0]+'_'+k]=[knownValue,unit];
                    k++;
                }  
            };
        };
        return(parsedObj);
    } catch (e) {
        if(e instanceof TypeError){
            alert("Invalid Input")
        }
    }
};

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
    } catch (e) {
        if(e instanceof TypeError){
            alert("Invalid Input")
        }
    }
};

function tempConvert(input,outputUnit){
    input = input.replace(/\s/g,"");
    outputUnit = outputUnit.toLowerCase();
    var inputValue, inputUnit, convertedValue;
    if(typeof input === "string"){
        inputValue = parseFloat((input.match(/\d+/))[0], 10);
        inputUnit = input.replace(inputValue,"").toLowerCase();
    } else {
        inputValue = input[0];
        inputUnit = input[1];
    };
    if(inputUnit == 'c' && outputUnit == 'f'){
        convertedValue = (inputValue * (9/5)) + 32;
    } else if (inputUnit == 'f' && outputUnit == 'c'){
        convertedValue = (inputValue - 32) * (5/9); 
    } else if (inputUnit == 'c' && outputUnit == 'k'){
        convertedValue = inputValue + 273;
    } else if (inputUnit == 'k' && outputUnit == 'c'){
        convertedValue = inputValue - 273
    } else if (inputUnit == 'f' && outputUnit == 'k'){
        convertedValue = (inputValue + 459.67) * (5/9)
    } else if (inputUnit == 'k' && outputUnit == 'f'){
        convertedValue = (inputValue * (9/5)) - 459.67
    };
    return (convertedValue + " (" + outputUnit + ")")
};

module.exports = {
    variableInput,
    unitConvert,
    tempConvert
};
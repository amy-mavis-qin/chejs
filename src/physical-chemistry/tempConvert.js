function tempConvert(input,outputUnit){
    input = input.trim();
    outputUnit = outputUnit.toLowerCase();
    let inputValue, inputUnit, convertedValue;
    if (typeof input === "string"){
        inputValue = parseFloat((input.match(/\d+/))[0], 10);
        inputUnit = input.replace(inputValue,"").toLowerCase();
    } else {
        inputValue = input[0];
        inputUnit = input[1];
    };
    if(inputUnit == 'c' && outputUnit == 'f'){
        convertedValue = (inputValue * (9/5)) + 32;
    } else if (inputUnit == 'f' && outputUnit == 'c') {
        convertedValue = (inputValue - 32) * (5/9); 
    } else if (inputUnit == 'c' && outputUnit == 'k') {
        convertedValue = inputValue + 273;
    } else if (inputUnit == 'k' && outputUnit == 'c') {
        convertedValue = inputValue - 273
    } else if (inputUnit == 'f' && outputUnit == 'k') {
        convertedValue = (inputValue + 459.67) * (5/9)
    } else if (inputUnit == 'k' && outputUnit == 'f') {
        convertedValue = (inputValue * (9/5)) - 459.67
    };
    return (convertedValue + " (" + outputUnit + ")")
};

module.exports = {
    tempConvert
};
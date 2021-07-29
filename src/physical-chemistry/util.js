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

module.exports = {
    variableInput
};
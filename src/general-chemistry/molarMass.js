var elements = require('../definitions/element_mass_properties.js');
elements = elements.elements;

function molarMass(formula){
    var molarMass = 0;
    var elementArray = formula.split(/(?=[A-Z])/);
    console.log(elementArray);
    for (var i in elements){
        for (var j in elementArray){
            if (elements[i].symbol == elementArray[j]){
                molarMass = molarMass + elements[i].mass
            }
            if (/\d/.test(elementArray[j])){
                var subscript = parseFloat((elementArray[j].match(/\d+/))[0], 10);
                var element = elementArray[j].replace(subscript,"");
                if(subscript !== 0 && elements[i].symbol == element){
                    molarMass = molarMass + (subscript * elements[i].mass)
                } 
            }
        }
    }
    return molarMass.toFixed(3);
}

module.exports = {
    molarMass
};
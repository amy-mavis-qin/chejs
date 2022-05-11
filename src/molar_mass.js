const elements = require('./definitions/element_mass_properties.js');

function molarMass(formula){
    let molarMass = 0;
    const elementArray = formula.split(/(?=[A-Z])/);
    for (const i in elements) {
        for (var j in elementArray) {
            if (elements[i].symbol == elementArray[j]) {
                molarMass = molarMass + elements[i].mass;
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
    if (molarMass === 0) {
        return ('Could not recognize element. Please ensure capitalization is correct');
    }
    return molarMass.toFixed(3);
}

module.exports = {
    molarMass
};
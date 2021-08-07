const chejs = require("./index.js");

console.log(chejs.unitConvert(30, 'atm', 'mmhg'));

console.log(chejs.tempConvert(30, 'k', 'c'));

console.log(chejs.molarMass('CH3CH2CH2OH'));

console.log(chejs.antoineCalculations('Acetaldehyde', '760mmhg'));

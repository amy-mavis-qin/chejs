const chejs = require("./index.js");

console.log(chejs.unitConvert(30, "atm", "mmhg"));

console.log(chejs.tempConvert(30, "k", "c"));

console.log(chejs.molarMass("CH3CH2CH2OH"));

console.log(chejs.antoineCalculations("Acetaldehyde", "760mmhg"));

console.log(chejs.idealEnthalpy([1, 2, 3], [4, 5, 6]));

console.log(chejs.idealVolume([1, 2, 3], [4, 5, 6]));

console.log(chejs.idealEntropy([1, 2, 3], [4, 5, 6], 2));

console.log(chejs.idealGibbsEnergy([1, 2, 3], [4, 5, 6], 1, 1));

console.log(chejs.ENDifference("N", "H"));

console.log(chejs.bonding("N", "H"));

console.log(chejs.ionicCharacter("B", "O"));

console.log(chejs.liquidHeatCapacity("Ammonia (l)", "298k"));

console.log(chejs.meanHeatCapacity("Methane", "298k", "298k"));

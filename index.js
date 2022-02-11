const { unitConvert, tempConvert } = require('./src/conversion.js');
const { idealEnthalpy, idealVolume, idealEntropy, idealGibbsEnergy, idealMu } = require('./src/ideal_solution_model.js');
const { molarMass } = require('./src/molar_mass.js');
const { antoineCalculations } = require('./src/antoine_calculations.js');
const { heatCapacityFromConstants } = require('./src/heat_capacity');
const { ENDifference, bonding } = require('./src/atomic_structure');


module.exports = {
    unitConvert,
    tempConvert,
    molarMass,
    antoineCalculations,
    heatCapacityFromConstants,
    idealEnthalpy,
    idealVolume,
    idealEntropy,
    idealGibbsEnergy,
    idealMu,
    ENDifference,
    bonding
};
const { unitConvert, tempConvert } = require('./src/conversion.js');
const { idealEnthalpy, idealVolume, idealEntropy, idealGibbsEnergy, idealMu } = require('./src/ideal_solution_model.js');
const { molarMass } = require('./src/molar_mass.js');
const { antoineCalculations } = require('./src/antoine_calculations.js');
const { heatCapacityFromConstants } = require('./src/heat_capacity');
const { ENDifference, bonding, ionicCharacter } = require('./src/atomic_structure');
const { antoine_constants } = require('./src/definitions/antoine_constants.js')
const { heatCapacityConstants } = require('./src/definitions/heat_capacity_constants.json')
const { elements } = require('./src/definitions/element_mass_properties.js');

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
    bonding,
    ionicCharacter,
    antoine_constants,
    heatCapacityConstants,
    elements
};
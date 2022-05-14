const { unitConvert, tempConvert } = require("./src/conversion.js");
const { molarMass } = require("./src/molar_mass.js");
const { antoineCalculations } = require("./src/antoine_calculations.js");
const { ENDifference, bonding, ionicCharacter } = require("./src/atomic_structure");
const { antoine_constants } = require("./src/definitions/antoine_constants.js");
const { elements } = require("./src/definitions/element_mass_properties.js");
const { liquidHeatCapacity, gasHeatCapacity, solidHeatCapacity } = require("./src/heat_capacity");
const {
    idealEnthalpy,
    idealVolume,
    idealEntropy,
    idealGibbsEnergy,
    idealMu,
} = require("./src/ideal_solution_model.js");
const {
    liquid_heat_capacity_constants,
    gas_heat_capacity_constants,
    solid_heat_capacity_constants,
} = require("./src/definitions/heat_capacity_constants");

module.exports = {
    unitConvert,
    tempConvert,
    molarMass,
    antoineCalculations,
    idealEnthalpy,
    idealVolume,
    idealEntropy,
    idealGibbsEnergy,
    idealMu,
    ENDifference,
    bonding,
    ionicCharacter,
    antoine_constants,
    elements,
    liquid_heat_capacity_constants,
    gas_heat_capacity_constants,
    solid_heat_capacity_constants,
    liquidHeatCapacity,
    gasHeatCapacity,
    solidHeatCapacity,
};

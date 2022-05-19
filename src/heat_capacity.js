const { variableInput } = require("./util.js");
const { tempConvert } = require("./conversion");
const {
    liquid_heat_capacity_constants,
    gas_heat_capacity_constants,
    solid_heat_capacity_constants,
} = require("./definitions/heat_capacity_constants.js");
const r = 8.314;

function liquidHeatCapacity(compound, temperature) {
    const [cpd, CpStd, A, B, C] = liquid_heat_capacity_constants.find(
        (array) => array[0] == compound
    );
    const [input, unit] = variableInput(temperature);
    const T = tempConvert(input, unit, "k");

    if (T > 373.15 || T < 273.15) {
        return "Temperature out of range (273.15k - 373.15k).";
    }

    return (
        r *
        (parseFloat(A) + parseFloat(B) * 10 ** -3 * T + parseFloat(C) * 10 ** -6 * T ** 2)
    ).toFixed(3);
}

function solidHeatCapacity(compound, temperature) {
    const [cpd, Tmax, CpStd, A, B, D] = solid_heat_capacity_constants.find(
        (array) => array[0] == compound
    );
    const [input, unit] = variableInput(temperature);
    const T = tempConvert(input, unit, "k");

    if (T > parseFloat(Tmax) || T < 298) {
        return `Temperature out of range (298k - ${Tmax}k).`;
    }

    if (D) {
        return (
            r *
            (parseFloat(A) + parseFloat(B) * 10 ** -3 * T + parseFloat(D) * 10 ** 5 * T ** -2)
        ).toFixed(3);
    } else {
        return (r * (parseFloat(A) + parseFloat(B) * 10 ** -3 * T)).toFixed(3);
    }
}

function gasHeatCapacity(compound, temperature) {
    const [cpd, Tmax, CpStd, A, B, C, D] = gas_heat_capacity_constants.find(
        (array) => array[0] == compound
    );
    const [input, unit] = variableInput(temperature);
    const T = tempConvert(input, unit, "k");

    if (T > parseFloat(Tmax) || T < 298) {
        return `Temperature out of range (298k - ${Tmax}k).`;
    }

    if (C) {
        return (
            r *
            (parseFloat(A) + parseFloat(B) * 10 ** -3 * T + parseFloat(C) * 10 ** -6 * T ** 2)
        ).toFixed(3);
    } else if (D) {
        return (
            r *
            (parseFloat(A) + parseFloat(B) * 10 ** -3 * T + parseFloat(D) * 10 ** 5 * T ** -2)
        ).toFixed(3);
    }
}

module.exports = {
    liquidHeatCapacity,
    gasHeatCapacity,
    solidHeatCapacity,
};

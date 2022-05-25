const { variableInput } = require("./util.js");
const { tempConvert } = require("./conversion");
const {gas_heat_capacity_constants} = require("./definitions/heat_capacity_constants.js");

function meanHeatCapacity(compound, t, t0) {
    let [cpd, Tmax, CpStd, A, B, C, D] = gas_heat_capacity_constants.find(
        (array) => array[0] == compound
    );

    A = parseFloat(A)
    B = parseFloat(B)
    C = parseFloat(C)
    D = parseFloat(D)

    let [input, unit] = variableInput(t);
    t = tempConvert(input, unit, "k");
    [input, unit] = variableInput(t0);
    t0 = tempConvert(input, unit, "k");

    if (t > parseFloat(Tmax) || t < 298 || t0 > parseFloat(Tmax) || t0 < 298) {
        return `Temperature out of range (298k - ${Tmax}k).`;
    }

    tau = t/t0

    if (C) {
        Cph = A + B/2*t0*(tau+1)+C/3*t0**2*(tau**2+tau+1)
    } else if (D) {
        Cph = A + B/2*t0*(tau+1)+D/(tau*t0**2)
    }

    deltaH = Cph*(t-t0)
    tprev = t
    t = deltaH / Cph + t0

    return {Cph, deltaH, t}
}

module.exports = {
    meanHeatCapacity
};

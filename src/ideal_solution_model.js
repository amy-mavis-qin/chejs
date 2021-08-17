const { validateArrayLength } = require('./util.js');

function idealMu(moleFraction, gibbs, R, T) {
    validateArrayLength(moleFraction, gibbs);
    let fractionGibbsSum = 0;
    let lnSum = 0;
    for (const i in moleFraction) {
        fractionGibbsSum += moleFraction[i] * gibbs[i];
        const ln = Math.log(moleFraction[i]);
        lnSum += ln * moleFraction[i];
    }
    return fractionGibbsSum + (R * T * lnSum);
}

function idealGibbsEnergy(moleFraction, gibbs, R, T) {
    validateArrayLength(moleFraction, gibbs);
    let fractionGibbsSum = 0;
    let lnSum = 0;
    for (const i in moleFraction) {
        fractionGibbsSum += moleFraction[i] * gibbs[i];
        const ln = Math.log(moleFraction[i]);
        lnSum += ln * moleFraction[i];
    }
    return fractionGibbsSum + (R * T * lnSum);
}

function idealEntropy(moleFraction, entropy, R) {
    validateArrayLength(moleFraction, entropy);
    let fractionEntropySum = 0;
    let lnSum = 0;
    for (const i in moleFraction) {
        fractionEntropySum += moleFraction[i] * entropy[i];
        const ln = Math.log(moleFraction[i]);
        lnSum += ln * moleFraction[i];
    }
    const sum = fractionEntropySum - (R * lnSum)
    return sum;
}

function idealVolume(moleFraction, volume) {
    validateArrayLength(moleFraction, volume);
    let idealVolume = 0;
    for (const i in moleFraction) {
        idealVolume += moleFraction[i] * volume[i];
    }
    return idealVolume;
}

function idealEnthalpy(moleFraction, enthalpy) {
    validateArrayLength(moleFraction, enthalpy);
    let idealEnthalpy = 0;
    for (const i in moleFraction) {
        idealEnthalpy += moleFraction[i] * enthalpy[i];
    }
    return idealEnthalpy;
}
module.exports = {
    idealEnthalpy,
    idealVolume,
    idealEntropy,
    idealGibbsEnergy,
    idealMu
}
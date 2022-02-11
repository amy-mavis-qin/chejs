const electronegativity = require('./definitions/electronegativity.js');

function ENDifference(element1, element2) {
    if (electronegativity[element1] && electronegativity[element2]) {
        if (electronegativity[element1] >= electronegativity[element2]) {
            return Math.round((electronegativity[element1] - electronegativity[element2])*100)/100;
        } else {
            return Math.round((electronegativity[element2] - electronegativity[element1])*100)/100;
        }
    } else {
        throw new Error("One or more elements could not be found.");
    }
}

function bonding(element1, element2) {
    const ENDiff = ENDifference(element1, element2);
    if (ENDiff < 0.4 && ENDiff >= 0) {
        return 'Non-polar covalent';
    } else if (ENDiff > 0.4 && ENDiff <= 1.8) {
        return 'Polar covalent';
    } else if (ENDiff > 1.8) {
        return 'Ionic';
    }
}

module.exports = {
    ENDifference,
    bonding
};


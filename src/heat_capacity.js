const heatCapacityConstants = require('./definitions/heat_capacity_constants.json');

function heatCapacityFromConstants(compound, state, temperature) {
    const minTemp = heatCapacityConstants[compound][state]['minT'];
    const maxTemp = heatCapacityConstants[compound][state]['maxT'];

    if (temperature <= minTemp || temperature >= maxTemp) {
        throw new Error('Temperature not within range.')
    }
    if (heatCapacityConstants[compound][state]) {
        const a = heatCapacityConstants[compound][state]['a'] ? heatCapacityConstants[compound][state]['a'] * Math.pow(10, -3) : 0;
        const b = heatCapacityConstants[compound][state]['b'] ? heatCapacityConstants[compound][state]['b'] * Math.pow(10, -5) : 0;
        const c = heatCapacityConstants[compound][state]['c'] ? heatCapacityConstants[compound][state]['c'] * Math.pow(10, -8) : 0;
        const d = heatCapacityConstants[compound][state]['d'] ? heatCapacityConstants[compound][state]['d'] * Math.pow(10, -12) : 0;

        if (heatCapacityConstants[compound][state]['form'] === 1) {
            return a + (b * temperature) + (c * Math.pow(temperature, 2) + (d * Math.pow(temperature, 3)));
        } else {
            return a + (b * temperature) + (c * Math.pow(temperature, -2));
        }
    } else {
        throw new Error('Unsupported state.')
    }
}

module.exports = {
    heatCapacityFromConstants
};
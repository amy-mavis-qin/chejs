
# ChEjs
#### Chemical engineering scripts (made by and for chem eng students)
### Installation
```
npm i chejs
```
### Usage
```
const chejs = require('chejs');
```
## Functions
### Conversion
##### tempConvert(input, inputUnit, outputUnit)
Supported units: Celsius&#40;c), Fahrenheit(f), Kelvin(k)
```
const temp = chejs.tempConvert('300', 'k, 'c');
```
##### unitConvert(input, inputUnit, outputUnit)
Supported units: see [units.js](https://github.com/amy-mavis-qin/chejs/blob/master/src/definitions/units.js)
```
const unit = chejs.unitConvert('760', 'mmhg', 'kPa');
```
### Calculations
##### Molar Calculations
```
const molarMassFromFormula = chejs.molarMass('CH3CH2OH');
```
##### antoineCalculations(molecule, input)
Supported molecules: see [antoine_constants.js](https://github.com/amy-mavis-qin/chejs/blob/master/src/definitions/antoine_constants.js)
Input can be vapor pressure or temperature. Feel free to use any of the supported units.
```
const pvap = chejs.antoineCalculations('Methyl_alcohol', '760mmhg');
```
##### heatCapacityFromConstants(compound, state, temperature)

This calculates heat capacity at constant pressure.

Supported compounds, states, temperatures: see [heat_capacity_constants.js](https://github.com/amy-mavis-qin/chejs/blob/master/src/definitions/heat_capacity_constants.js)

```
const heatCapacity = chejs.heatCapacity('acetone', 'g', '30');
```
### Physical Chemistry

```
chejs.idealMu(moleFraction, gibbs, R, T)
chejs.idealGibbsEnergy(moleFraction, gibbs, R, T)
chejs.idealEntropy(moleFraction, entropy, R)
chejs.idealVolumn(moleFraction, volume)
chejs.idealEnthalpy(moleFraction, enthalpy)
```
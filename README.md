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
##### tempConvert(input w/ units, output unit)
Supported units: Celsius&#40;c), Fahrenheit(f), Kelvin(k)
```
const temp = chejs.tempConvert('300k', 'c');
```
##### unitConvert(input w/ units, output unit)
Supported units: see [units.js](https://github.com/amy-mavis-qin/chejs/blob/master/definitions/units.js)
```
const unit = chejs.tempConvert('760mmhg', 'kPa');
```
### Molar Calculations
```
const molarMassFromFormula = chejs.molarMass('CH3CH2OH');

const moles = chejs.calculateMoles(molarMass, mass);
const mass = chejs.calculateMass(molarMass, mole);
const molarMass = chejs.calculateMolarMass(mole, mass);
```
### Pressure Calculations
##### antoineCalculations(molecule, input)
Supported molecules: see [antoine_constants.js](https://github.com/amy-mavis-qin/chejs/blob/master/definitions/antoine_constants.js)
Input can be vapor pressure or temperature. Feel free to use any of the supported units.
```
const pvap = chejs.antoineCalculations('Methyl_alcohol', '760mmhg');
```

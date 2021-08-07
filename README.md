
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
Supported units: see [units.js](https://github.com/amy-mavis-qin/chejs/blob/master/definitions/units.js)
```
const unit = chejs.tempConvert('760', 'mmhg', 'kPa');
```
### Molar Calculations
```
const molarMassFromFormula = chejs.molarMass('CH3CH2OH');
```
### Pressure Calculations
##### antoineCalculations(molecule, input)
Supported molecules: see [antoine_constants.js](https://github.com/amy-mavis-qin/chejs/blob/master/definitions/antoine_constants.js)
Input can be vapor pressure or temperature. Feel free to use any of the supported units.
```
const pvap = chejs.antoineCalculations('Methyl_alcohol', '760mmhg');
```

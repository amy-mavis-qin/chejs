const fs = require('fs');
const replace = require('replace-in-file');

const opt = process.argv[2];

// Modify version number
function updateVersion(version) {
    fs.readFile('./package.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(error);
        }

        let semver = JSON.parse(data).version;
        const arr = semver.split('.');

        if (version === 'major') {
            arr[0] = parseInt(arr[0]) + 1;
        } else if (version === 'minor') {
            arr[1] = parseInt(arr[1]) + 1;
        } else if (version === 'patch') {
            arr[2] = parseInt(arr[2]) + 1;
        } else {
            throw new Error(`${version} is invalid.`);
        }

        const newSemver = arr.join('.');

        const options = {
            files: './package.json',
            from: /"version": \"[0-9]\.[0-9]\.[0-9]\"/,
            to: `"version": "${newSemver}"`,
          };

          try {
            const results = replace.sync(options);
            console.log(results);
            console.log(`Updated to version ${newSemver}`);
          }
          catch (error) {
              console.log(error);
          }          
    })
}

updateVersion(opt);
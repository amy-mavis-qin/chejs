const fs = require('fs');
const replace = require('replace-in-file');

const opt = process.argv[2];

// Modify version number
function updateVersion(version) {
    fs.readFile('./package.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        }

        let semver = JSON.parse(data).version;
        const arr = semver.split('.');

        if (version === 'major') {
            arr[0] = parseInt(arr[0]) + 1;
            arr[1] = '0';
            arr[2] = '0';
        } else if (version === 'minor') {
            arr[1] = parseInt(arr[1]) + 1;
            arr[2] = '0';
        } else if (version === 'patch') {
            arr[2] = parseInt(arr[2]) + 1;
        } else if (!version) {
            console.log('Skipping update version.');
            return;
        } else {
            throw new Error(`${version} is invalid.`);
        }

        const newSemver = arr.join('.');

        const options = {
            files: './package.json',
            from: /"version": "[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}"/,
            to: `"version": "${newSemver}"`,
          };

          try {
            console.log(`Updating to ${newSemver}`);
            const results = replace.sync(options);
            console.log(results)
          }
          catch (error) {
              console.log(error);
          }          
    })
}

updateVersion(opt);
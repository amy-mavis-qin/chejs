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
        } else if (!version) {
            console.log('Skipping update version.');
            return;
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

// Update index.js with functions
function update() {
    const lines = []; 
    
    const src = fs.readdirSync('./src');
    fs.readFileSync('./index.js', 'utf-8').split(/\r?\n/).forEach(function(line){
        lines.push(line);
    })

    src.forEach((dir) => {
        const files = fs.readdirSync(`./src/${dir}`);
        files.forEach((file) => {
            const path = `./src/${dir}/${file}`;
            const func = file.replace('.js', '');

            if (!lines.find((line) => new RegExp(path).test(line)) && (!lines.find((line) => /\n/.test(line))) ) {
                fs.appendFileSync('./index.js', `export { default as ${func} } from "${path}";\n`);
            } else if (!lines.find((line) => /\n/.test(line))) {
                if (!fs.existsSync(path)) {
                    const options = {
                        files: './index.js',
                        from: `export { default as ${func} } from "${path}";\n`,
                        to: "",
                      };
                    replace.sync(options);
                }
            }
        })
    })
}

update();
updateVersion(opt);

let JSZip = require('jszip');
let fs = require('fs');
let path = require('path');

function mkdir(p) {
    if (! fs.existsSync(p)) {
        fs.mkdirSync(p);
    }
}

module.exports = function(zipFPath, _outPath) {
    let outPath = _outPath || path.resolve(path.dirname(zipFPath), path.basename(zipFPath));
    return new JSZip.external.Promise((resolve, reject) => {
        fs.readFile(zipFPath, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    }).then(data => {
        return JSZip.loadAsync(data);
    }).then(zip => {

        mkdir(outPath);
        zip.forEach((key, zo) => {
            let fpath = path.resolve(outPath, zo.name);
            if (zo.dir) {
                mkdir(fpath);
            } else {
                zo.async('string').then(txt => {
                    fs.writeFileSync(fpath, txt);
                });

            }
        });
    });


};

const fs = require('fs');
const path = require('path');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

function resetData(){
    fs.unlinkSync('./data/data.json');
}

function loadFile(filePath){

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    var val = {};
    var status = 0;

    try {
        const data = fs.readFileSync(filePath, 'utf8')
        val = data;
        status = 200;

        if (extname === '.json'){
            val = JSON.parse(val);
        }

        } 
    catch (err) {
        val = err;
        status = 404;
        }

    return [status, val, contentType]
}


function saveFile(filePath, data){

    fs.writeFile(filePath, JSON.stringify(data), function(err) {
        if(err) {
            return console.log(err);
        }
        //console.log("The file was saved!");
    }); 
}

module.exports.loadFile = loadFile;
module.exports.saveFile = saveFile;
module.exports.resetData = resetData;

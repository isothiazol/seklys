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
    const path = './data/data.json'
    fs.existsSync(path) ? fs.unlinkSync(path) : null ;
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


function saveData(filePath, dataIn){

    if(!fs.existsSync(filePath)){
        fs.writeFile(filePath, JSON.stringify(dataIn), function(err) {
            if(err) {return console.log(err);}
        }); 
    }
    else{

        var dataDisk = fs.readFile(filePath, 'utf8' , (err, data) => {
                            if (err) {return console.log(err);}

                            var contentDisk = JSON.parse(data);
                            console.log(contentDisk);

                            dataIn['dataBike'] ? contentDisk['dataBike'] = dataIn['dataBike'] : null ;
                            dataIn['goalBike'] ? contentDisk['goalBike'] = dataIn['goalBike'] : null ;

                            fs.writeFile(filePath, JSON.stringify(contentDisk), function(err) {
                                if(err) {return console.log(err);}
                            });
                        })
    }
}

module.exports.loadFile = loadFile;
module.exports.saveData = saveData;
module.exports.resetData = resetData;

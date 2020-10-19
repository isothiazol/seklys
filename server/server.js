const http = require('http');
const aux = require('./aux.js');
var fs = require('fs');


// Preload server files
const dataIndex = aux.loadFile('../index.html');
const dataStyle = aux.loadFile('../styles/style.css');
const dataChart = aux.loadFile('../scripts/Chart.js');
const dataMain = aux.loadFile('../scripts/main.js');
const dataLogo = aux.loadFile('../images/logo.svg');
const dataFont = aux.loadFile('../styles/fonts/SongMyung-Regular.ttf');
// Check for data folder
if (!fs.existsSync('./data/')) {
  fs.mkdirSync('./data/');
}


const requestListener = function (req, res) {

  switch (req.method){
    case 'GET':
      var reqIp = req.connection.remoteAddress.split(':')['3'];
      console.log('Connection from '+reqIp);
      var filePath = req.url;
      
      switch (filePath){
        case '/':
          res.writeHead(dataIndex[0]);
          res.write(dataIndex[1]);
          res.end();
          break;

        case '/index.html':
          res.writeHead(dataIndex[0]);
          res.write(dataIndex[1]);
          res.end();
          break;

        case '/styles/style.css':
          res.writeHead(dataStyle[0]);
          res.write(dataStyle[1]);
          res.end();
          break;
        
        case '/scripts/Chart.js':
          res.writeHead(dataChart[0]);
          res.write(dataChart[1]);
          res.end();
          break;

        case '/scripts/main.js':
          res.writeHead(dataMain[0]);
          res.write(dataMain[1]);
          res.end();
          break;

        case '/images/logo.svg':
          res.writeHead(dataLogo[0]);
          res.write(dataLogo[1]);
          res.end();
          break;

        case '/styles/fonts/SongMyung-Regular.ttf':
          res.writeHead(dataFont[0]);
          res.write(dataFont[1]);
          res.end();
          break;

        case '/data':
          let data = aux.loadFile('./data/test.json');
          res.writeHead(data[0]);
          res.write(JSON.stringify(data[1]));
          res.end();
          break;

        case '/reset':
          aux.resetData();
          res.writeHead(200);
          res.end();
          break;

        default:
          res.writeHead(204);
          res.end();
          break;
        }
      break;

    case 'POST':
      let body = '';
      req.on('data', chunk => {
          body += chunk.toString();
      });
      req.on('end', () => {
          let data = JSON.parse(body);
          aux.saveData('data/data.json', data)
          res.end('ok');
      });
      break;

    default:
      console.log('Unknown request method '+req.method);
      break;
  }
}

const server = http.createServer(requestListener);
server.listen(8080);
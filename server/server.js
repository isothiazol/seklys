const http = require('http');
const aux = require('./aux.js');


// Preload server files
const dataIndex = aux.loadFile('../index.html');
const dataStyle = aux.loadFile('../styles/style.css');
const dataChart = aux.loadFile('../scripts/Chart.js');
const dataMain = aux.loadFile('../scripts/main.js');
const dataLogo = aux.loadFile('../images/logo.svg');
const dataFont = aux.loadFile('../styles/fonts/SongMyung-Regular.ttf');

const requestListener = function (req, res) {
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
    default:
      res.writeHead(204);
      res.end();
      break;
    }
}

const server = http.createServer(requestListener);
server.listen(8080);
const http = require('http');
const aux = require('./aux.js');


// Preload server files
const dataIndex = aux.loadFile('../index.html');
const dataStyle = aux.loadFile('../styles/style.css');
const dataChart = aux.loadFile('../scripts/Chart.js');
const dataMain = aux.loadFile('../scripts/main.js');
const dataLogo = aux.loadFile('../images/logo.svg');
const dataFont = aux.loadFile('../styles/fonts/SongMyung-Regular.ttf');

console.log(dataFont[0]+'  '+dataFont[2]);

const requestListener = function (req, res) {
  res.writeHead(dataFont[0]);
  res.write(dataFont[1]);
  res.end();
}

const server = http.createServer(requestListener);
server.listen(8080);
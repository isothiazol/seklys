
const mainHeading = document.getElementById('MainHeader');
const ldate = document.getElementById('ldate');
const ltime = document.getElementById('ltime');
const formMsg = document.getElementById('formMsg');
const ctx = document.getElementById('myChart');
const submitButton = document.getElementById('submitBike');
const inputContainer = document.getElementById('inputContainer');
const goalContainer = document.getElementById('goalContainer');
const reset = document.getElementById('reset');
const goalBike = document.getElementById('goalBike');
const updateGoalBike = document.getElementById('updateGoalBike');
const linkMain = document.getElementById('linkMain');
const linkBike = document.getElementById('linkBike');
const linkSettings = document.getElementById('linkSettings');
const selectGraph = document.getElementById('selectGraph');

const cumulativeSum = (sum => value => sum += value)(0);

function postData(url, data) {
    return fetch(url, {method: 'POST', body: JSON.stringify(data)});
}

function updateDisplay(){
    var displayState = localStorage.getItem('displayState');

    if (displayState === 'main'){
        displayMain();
    }
    else if (displayState === 'bike') {
        displayBikeTracking();
    }
    else if (displayState === 'settings') {
        displaySettings();
    }
    else {
        displayMain();        
    }
}

function displayMain(){
    inputContainer.style.display = 'none';
    formMsg.style.display = 'none';
    ctx.style.display = 'none';
    submitButton.style.display = 'none';
    goalContainer.style.display = 'none';
    reset.style.display = 'none';
    selectGraph.style.display = 'none';

    mainHeading.textContent = 'Sveiki atvykę į savo asmeninio tikslo stebėjimo įrankį';
}

function displayBikeTracking(){
    inputContainer.style.display = 'block';
    formMsg.style.display = 'block';
    ctx.style.display = 'block';
    submitButton.style.display = 'block';
    goalContainer.style.display = 'none';
    reset.style.display = 'none';
    selectGraph.style.display = 'block';

    mainHeading.textContent = 'Bike Tracking';
    ldate.valueAsDate = new Date();

    triggerPlot(); 
}

function displaySettings(){
    inputContainer.style.display = 'none';
    formMsg.style.display = 'none';
    ctx.style.display = 'none';
    submitButton.style.display = 'none';
    goalContainer.style.display = 'block';
    reset.style.display = 'block';
    selectGraph.style.display = 'none';

    mainHeading.textContent = 'Settings';
}

function triggerPlot(){
    if (localStorage.getItem('dataBike')){
        var dataBike = JSON.parse(localStorage.getItem('dataBike'));
        plotChart(dataBike);
    }
    else{
        plotChart([' '], [0])
    }
}

function plotChart(data) {
    // Sorting days
    var sorted_days = [];
    for(var key in data) {
        sorted_days[sorted_days.length] = key;
    }
    sorted_days.sort();

    // Extracting sorted data
    var sorted_vals = sorted_days.map(x => data[x])

    var goal_vals = sorted_days.map(x => localStorage.getItem('goalBike'))
    var pointsColor = sorted_days.map(x => 'rgba(85, 172, 238, 1)')

    // Getting graph type
    var graphType = localStorage.getItem('graphType');

    // Plot
    
    if (graphType === 'cumTimeGraph') {
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sorted_days,
                datasets: [{
                    label: 'Time biked',
                    steppedLine: 'false',
                    data: sorted_vals.map(cumulativeSum),
                    backgroundColor: [
                        'rgba(85, 172, 238, 0.2)'
                    ],
                    borderColor: [
                        'rgba(85, 172, 238, 1)'
                    ],
                    pointRadius: 4,
                    borderWidth: 1,
                    pointBackgroundColor: pointsColor
                },
                {
                    label: 'Goal',
                    data: goal_vals,
                    backgroundColor: [
                        'rgba(41, 47, 51, 0)'
                    ],
                    borderColor: [
                        'rgba(41, 47, 51, 1)'
                    ],
                    borderDash: [10,5],
                    pointRadius: 0,
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: 'True',
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    else {
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sorted_days,
                datasets: [{
                    label: 'Time biked',
                    data: sorted_vals,
                    backgroundColor: [
                        'rgba(85, 172, 238, 0.2)'
                    ],
                    borderColor: [
                        'rgba(85, 172, 238, 1)'
                    ],
                    pointRadius: 4,
                    borderWidth: 1,
                    pointBackgroundColor: pointsColor
                }]
            },
            options: {
                maintainAspectRatio: 'True',
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    
    return 'True'
  }

submitButton.onclick = function() {
    updateGoalBike.disabled = true;
    if (ldate.value === '' || ltime.value === '') {
        formMsg.textContent = 'Cannot leave empty!';
    }
    else{
        if(isNaN(ltime.value)){
            formMsg.textContent = 'Time needs to be a number!';
        }
        else{
            var dataBike = JSON.parse(localStorage.getItem('dataBike'));
            if (dataBike){
                if(dataBike[ldate.value]){
                    dataBike[ldate.value] = dataBike[ldate.value] + parseFloat(ltime.value);
                }
                else{
                    dataBike[ldate.value] = parseFloat(ltime.value);
                }
                
                localStorage.setItem('dataBike', JSON.stringify(dataBike));
            }
            else{
                var dataBike = {};
                dataBike[ldate.value] = parseFloat(ltime.value)
                localStorage.setItem('dataBike', JSON.stringify(dataBike));
            }
            plotChart(dataBike);
            postData('/', {'dataBike': dataBike})
        }
    }
    submitButton.disabled = false;
}

updateGoalBike.onclick = function() {
    updateGoalBike.disabled = true;
    if(isNaN(goalBike.value)){

    }
    else{
        localStorage.setItem('goalBike',  parseFloat(goalBike.value));
        postData('/', {'goalBike': goalBike.value})
        goalBike.value = null
    }
    updateGoalBike.disabled = false;
}

linkMain.onclick = function() {
    linkMain.disabled = true;
    localStorage.setItem('displayState', 'main');
    updateDisplay();
    linkMain.disabled = false;
}

linkBike.onclick = function() {
    linkBike.disabled = true;
    localStorage.setItem('displayState', 'bike');
    updateDisplay();
    linkBike.disabled = false;
}

linkSettings.onclick = function() {
    linkSettings.disabled = true;
    localStorage.setItem('displayState', 'settings');
    updateDisplay();
    linkSettings.disabled = false;
}

reset.onclick = function() {
    reset.disabled = true;
    alert('Data reset completed !');
    fetch('/reset');
    localStorage.clear();
    reset.disabled = false;
}

selectGraph.addEventListener('change', foo);
function foo() {
    const value = selectGraph.options[selectGraph.selectedIndex].value;
    localStorage.setItem('graphType', value);
    triggerPlot(); 
}

updateDisplay();

var dataBike = JSON.parse(localStorage.getItem('dataBike'));
if (!dataBike){
    fetch('/data')
    .then(response => response.json())
    .then(data => data['dataBike'] ? localStorage.setItem('dataBike', JSON.stringify(data['dataBike'])) : null)
}

var dataBike = JSON.parse(localStorage.getItem('goalBike'));
if (!dataBike){
    fetch('/data')
    .then(response => response.json())
    .then(data => data['goalBike'] ? localStorage.setItem('goalBike', JSON.stringify(data['goalBike'])) : null)
}

    

const mainHeading = document.getElementById('MainHeader');
const ldate = document.getElementById('ldate');
const ltime = document.getElementById('ltime');
const formMsg = document.getElementById('formMsg');
const ctx = document.getElementById('myChart');
const submitButton = document.getElementById('submitBike');
const inputContainer = document.getElementById('inputContainer');
const linkMain = document.getElementById('linkMain');
const linkBike = document.getElementById('linkBike');

function updateDisplay(){
    var displayState = localStorage.getItem("displayState");

    if (displayState === 'main'){
        displayMain();
    }
    else if (displayState === 'bike') {
        displayBikeTracking();
    }
    else {
        displayMain();        
    }
}

function displayMain(){
    inputContainer.style.display = "none";
    formMsg.style.display = "none";
    ctx.style.display = "none";
    submitButton.style.display = "none";

    mainHeading.textContent = 'Hello world!';
}

function displayBikeTracking(){
    inputContainer.style.display = "block";
    formMsg.style.display = "block";
    ctx.style.display = "block";
    submitButton.style.display = "block";

    mainHeading.textContent = 'Bike Tracking';
    ldate.valueAsDate = new Date();

    if (localStorage.getItem("dataBike")){
        var dataBike = JSON.parse(localStorage.getItem("dataBike"));
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

    

    // Plot
    
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sorted_days,
            datasets: [{
                label: 'Data',
                data: sorted_vals,
                backgroundColor: [
                    'rgba(85, 172, 238, 0.2)'
                ],
                borderColor: [
                    'rgba(85, 172, 238, 1)'
                ],
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
                }]
            }
        }
    });

    return 'True'
  }

submitButton.onclick = function() {
    if (ldate.value === '' || ltime.value === '') {
        formMsg.textContent = 'Cannot leave empty!';
    }
    else{
        var dataBike = JSON.parse(localStorage.getItem("dataBike"));
        if (dataBike){
            dataBike[ldate.value] = parseFloat(ltime.value)
            localStorage.setItem("dataBike", JSON.stringify(dataBike));
        }
        else{
            var dataBike = {};
            dataBike[ldate.value] = parseFloat(ltime.value)
            localStorage.setItem("dataBike", JSON.stringify(dataBike));
        } 
        plotChart(dataBike);
    }
}

linkMain.onclick = function() {
    localStorage.setItem("displayState", 'main');
}

linkBike.onclick = function() {
    localStorage.setItem("displayState", 'bike');
}

updateDisplay();

let startButton = document.getElementById('start-stop');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let timeDisplay = document.getElementById('time-display');
let lapList = document.getElementById('lap-list');

let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapTimes = [];

function formatTime(ms) {
    let date = new Date(ms);
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function startStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            timeDisplay.textContent = formatTime(elapsedTime);
        }, 10);
        isRunning = true;
        startButton.textContent = 'Pause';
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    startButton.textContent = 'Start';
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
    lapList.innerHTML = '';
    lapTimes = [];
}

function recordLap() {
    if (isRunning) {
        let lapTime = formatTime(elapsedTime);
        lapTimes.push(lapTime);
        let li = document.createElement('li');
        li.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
        lapList.appendChild(li);
    }
}

startButton.addEventListener('click', startStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);



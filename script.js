let startTime, updatedTime, difference;
let interval;
let paused = false;
let lapCounter = 1;

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const timeDisplay = document.getElementById('timeDisplay');
const lapsList = document.getElementById('lapsList');

// Function to start the stopwatch
function startStopwatch() {
    if (!paused) {
        startTime = new Date().getTime();
    } else {
        startTime = new Date().getTime() - difference;
        paused = false;
    }

    interval = setInterval(updateTime, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

// Function to pause the stopwatch
function pauseStopwatch() {
    clearInterval(interval);
    paused = true;
    difference = new Date().getTime() - startTime;
    pauseBtn.disabled = true;
    startBtn.disabled = false;
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(interval);
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    paused = false;
    timeDisplay.textContent = "00:00:00";
    lapsList.innerHTML = "";
    lapCounter = 1;

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

// Function to log lap times
function logLap() {
    const lapTime = timeDisplay.textContent;
    const lapElement = document.createElement('li');
    lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsList.appendChild(lapElement);
    lapCounter++;
}

// Function to update the displayed time
function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    const seconds = Math.floor((updatedTime / 1000) % 60);
    const minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    const hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);

    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedHours = hours < 10 ? '0' + hours : hours;

    timeDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Event listeners for buttons
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', logLap);

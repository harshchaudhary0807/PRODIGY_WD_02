let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const result = document.getElementById("result");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const lapButton = document.getElementById("lap-button");
const lapsContainer = document.getElementById("laps");

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  return (
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + ":" +
    String(milliseconds).padStart(3, "0")
  );
}

function updateDisplay() {
  const now = Date.now();
  const time = now - startTime + elapsedTime;
  result.textContent = formatTime(time);
}

startButton.onclick = () => {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
    isRunning = true;
  }
};

stopButton.onclick = () => {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
  }
};

resetButton.onclick = () => {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  result.textContent = "00:00:000";
  lapsContainer.innerHTML = ""; // Clear laps
};

lapButton.onclick = () => {
  if (isRunning) {
    const currentTime = formatTime(Date.now() - startTime + elapsedTime);
    const lap = document.createElement("div");
    lap.textContent = "Lap: " + currentTime;
    lapsContainer.appendChild(lap);
  }
};
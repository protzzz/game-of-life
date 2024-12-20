const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const resolution = 10;
canvas.width = 800;
canvas.height = 800;

const _COLUMNS = canvas.width / resolution;
const _ROWS = canvas.height / resolution;

let grid = buildGrid();
let isRunning = false;
let animationFrame;

const worker = new Worker("worker.js");

worker.onmessage = (event) => {
    grid = event.data;
    render(grid);
    if (isRunning) {
        animationFrame = requestAnimationFrame(update);
    }
};

worker.onerror = (error) => {
    console.error("Error:", error.message);
};

function buildGrid() {
    return new Array(_COLUMNS)
        .fill(null)
        .map(() =>
            new Array(_ROWS).fill(null).map(() => Math.floor(Math.random() * 2))
        );
}

let startButton = document.getElementById('start-btn')

function start() {
    if (!isRunning) {
        isRunning = true;
        update();
    }
}

function stop() {
    isRunning = false;
    cancelAnimationFrame(animationFrame);
    startButton.textContent = 'Continue'
}

function reset() {
    stop();
    grid = buildGrid();
    render(grid);

    if (startButton.textContent == 'Continue') {
        startButton.textContent = 'Start'
    }
}

function update() {
    if (!isRunning) return;

    worker.postMessage(grid);
}

function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            ctx.beginPath();
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? "black" : "white";
            ctx.fill();
            ctx.strokeStyle = "gray";
            ctx.stroke();
        }
    }
}

render(grid);
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(event) {
    isDrawing = true;
    // Get the initial coordinates, accounting for canvas offset
    [lastX, lastY] = [event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop];
    
    // Begin a new path
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
}

function draw(event) {
    if (!isDrawing) return;
    
    // Get current mouse position
    const currentX = event.clientX - canvas.offsetLeft;
    const currentY = event.clientY - canvas.offsetTop;
    
    // Configure drawing styles
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    
    // Draw a line from the last position to the current position
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    
    // Update last position
    [lastX, lastY] = [currentX, currentY];
}

function stopDrawing() {
    isDrawing = false;
    // Begin a new path when stopping to prevent connecting lines
    ctx.beginPath();
}

document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('processDrawing').addEventListener('click', processDrawing);

function processDrawing() {
    const dataURL = canvas.toDataURL('image/png');
    console.log('Image ready to process:', dataURL);
    // Send this to the backend or OCR API
}

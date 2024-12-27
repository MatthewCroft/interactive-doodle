const c = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/game-websocket'
});

c.onConnect = (frame) => {
    console.log('Connected: ' + frame);
}

c.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
}

c.onStompError = (error) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
}

let isDrawing  = false;
let lastX = 0;
let lastY = 0;

const canvas = $('#whiteboard')[0];
const ctx = canvas.getContext('2d');
let currentColor = $('#color-picker').val();

const nameCanvas = $('#namewhiteboard')[0];
const nameContext = nameCanvas.getContext('2d');

function resizeCanvas() {
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    nameCanvas.width = $(window).width();
    nameCanvas.height = $(window).height();
}

// Initialize canvas size on page load
function beginDraw(event) {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
}

function drawLine(event) {
    if (!isDrawing) return;
    const currentX = event.offsetX;
    const currentY = event.offsetY;

    ctx.beginPath();

    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    nameContext.clearRect(0, 0, nameCanvas.width, nameCanvas.height);

    nameContext.font = "16px Arial";
    nameContext.fillStyle = currentColor;
    nameContext.fillText(localStorage.getItem('userName'), currentX + 10, currentY - 10);

    c.publish({
        destination: "/app/draw",
        body: JSON.stringify({
            'name': localStorage.getItem('userName'),
            'currentColor': currentColor,
            'currentX': currentX,
            'currentY': currentY,
            'previousX': lastX,
            'previousY': lastY
        })
    });

    lastX = currentX;
    lastY = currentY;
}

function drawStop() {
    isDrawing = false;
}

function updateColor() {
    currentColor = $("#color-picker").val();
}

$(document).ready(function() {
    c.activate();
    resizeCanvas();
    $("#whiteboard").on("mousemove", drawLine);
    $("#whiteboard").on("mousedown",beginDraw);
    $("#whiteboard").on("mouseup", drawStop);
    $("#whiteboard").on("mouseout", drawStop);
    $("#color-picker").on("input", updateColor);
})


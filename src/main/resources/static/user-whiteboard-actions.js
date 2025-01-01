const c = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/game-websocket'
});

c.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    c.subscribe('/topic/clear', () => {
        clearGuests();
        clearUserBoard();
    })
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
let currentColor = "black";

const nameCanvas = $('#namewhiteboard')[0];
const nameContext = nameCanvas.getContext('2d');

function resizeCanvas() {
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    nameCanvas.width = $(window).width();
    nameCanvas.height = $(window).height();
}

function beginDraw(event) {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
}

function drawLine(event) {
    if (!isDrawing) return;
    const currentX = event.offsetX;
    const currentY = event.offsetY;

    createLine(ctx, currentX, currentY, lastX, lastY, currentColor);
    updateNameContext(nameContext, currentColor, currentX, currentY, localStorage.getItem('userName'));

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

function resetBoard() {
    c.publish({
        destination: '/app/clear'
    });
}

function clearUserBoard() {
    ctx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
    nameContext.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
}

$(document).ready(function() {
    c.activate();
    resizeCanvas();
    $("#whiteboard").on("mousemove", drawLine);
    $("#whiteboard").on("mousedown",beginDraw);
    $("#whiteboard").on("mouseup", drawStop);
    $("#whiteboard").on("mouseout", drawStop);
    $("#color-picker").on("input", updateColor);
    $('#upper-left-button').on('click', resetBoard);
})


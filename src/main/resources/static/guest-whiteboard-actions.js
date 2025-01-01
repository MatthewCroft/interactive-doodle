const stomp= new StompJs.Client({
    brokerURL: 'ws://localhost:8080/game-websocket'
});

stomp.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    stomp.subscribe('/topic/draw', (draw) => {
        console.log(draw.body);
        drawGuestLine(JSON.parse(draw.body));
    });
}

stomp.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
}

stomp.onStompError = (error) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
}

const canvasMap = new Map();

function drawGuestLine(draw) {
    if (draw.name === localStorage.getItem("userName")) return;
    if (!canvasMap.has(`${draw.name}-name`)) {
        createGuestContext(draw);
    }

    let drawContext = canvasMap.get(`${draw.name}-draw`);
    let nameContext = canvasMap.get(`${draw.name}-name`);

    createLine(drawContext, draw.currentX, draw.currentY,
        draw.previousX, draw.previousY, draw.currentColor);
    updateNameContext(nameContext, draw.currentColor, draw.currentX, draw.currentY, draw.name);
}

function createGuestContext(draw) {
    let $drawCanvas = $("<canvas></canvas>");

    $drawCanvas.attr("id", `${draw.name}-draw`)
        .attr('width', nameCanvas.width)
        .attr('height', nameCanvas.height);
    $drawCanvas.css('z-index', 1);
    $('#whiteboard-container').append($drawCanvas);

    let $nameCanvas = $("<canvas></canvas>");
    $nameCanvas.attr("id", `${draw.name}-name`)
        .attr('width', nameCanvas.width)
        .attr('height', nameCanvas.height);
    $nameCanvas.css('z-index', 1);
    $('#whiteboard-container').append($nameCanvas);

    let drawContext = $drawCanvas[0].getContext("2d");
    let nameContext = $nameCanvas[0].getContext("2d");

    canvasMap.set(`${draw.name}-name`, nameContext);
    canvasMap.set(`${draw.name}-draw`, drawContext);
}

function clearGuests() {
    for (const canvas of canvasMap.keys()) {
        let element = canvasMap.get(canvas);
        element.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
    }
}

$(document).ready(function() {
    stomp.activate();
})
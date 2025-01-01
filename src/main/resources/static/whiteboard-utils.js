function createLine(context, currentX, currentY, lastX, lastY, currentColor) {
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(currentX, currentY);
    context.strokeStyle = currentColor;
    context.stroke();
}

function updateNameContext(context, currentColor, currentX, currentY, userName) {
    context.clearRect(0, 0, nameCanvas.width, nameCanvas.height);

    context.font = "16px Arial";
    context.fillStyle = currentColor;
    context.fillText(userName, currentX + 10, currentY - 10);
}
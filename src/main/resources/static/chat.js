const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/game-websocket'
});

stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/chat', (chat) => {
        appendMessage(chat.body);
    })
}

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
}

stompClient.onStompError = (error) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
}

function appendMessage(chat) {
    $('#chat-box').append(`
        <div class="message-box">
            <p class="sender">You:</p>
            <p class="message-content">${chat}</p>
        </div>
    `);
}

function sendMessage() {
    stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify({'message': $('#message-input').val()})
    });

    $('#message-input').val("");
}

$(function () {
    stompClient.activate();
    $("#send-btn").click(() => sendMessage());
})
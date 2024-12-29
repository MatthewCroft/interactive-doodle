const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/game-websocket'
});

stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/chat', (chat) => {
        appendMessage(JSON.parse(chat.body));
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
            <p class="message-content" style="color: ${chat.color};">${chat.name}: ${chat.message}</p>
        </div>
    `);
}

function sendMessage() {
    stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify({
            'color': currentColor,
            'message': $('#message-input').val(),
            'name': localStorage.getItem('userName')
        })
    });

    $('#message-input').val("");
}

function enterSend(event) {
    if (event.which === 13) {
        sendMessage();
    }
}

function toggleChat() {
    $('#chat-container').toggle();

    if ($("#chat-container").is(":visible")) {
        $("#message-input").focus();
    }
}

$(function () {
    stompClient.activate();
    $("#send-btn").click(() => sendMessage());
    $("#message-input").keypress(enterSend);
    $('#toggle-chat-btn').on('click', toggleChat);
})
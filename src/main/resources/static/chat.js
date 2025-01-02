function appendMessage(chat) {
    $('#chat-box').append(`
        <div class="message-box">
            <p class="message-content" style="color: ${chat.color};">${chat.name}: ${chat.message}</p>
        </div>
    `);
}

async function sendMessage() {
    let client = await getStompClient();

    client.publish({
        destination: "/app/chat",
        body: JSON.stringify({
            'color': currentColor,
            'message': $('#message-input').val(),
            'name': localStorage.getItem('userName')
        })
    });

    $('#message-input').val("");
}

async function enterSend(event) {
    if (event.which === 13) {
        await sendMessage();
    }
}

function toggleChat() {
    $('#chat-container').toggle();

    if ($("#chat-container").is(":visible")) {
        $("#message-input").focus();
    }
}

$(function () {
    $("#send-btn").click(() => sendMessage());
    $("#message-input").keypress(enterSend);
    $('#toggle-chat-btn').on('click', toggleChat);
})
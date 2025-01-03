let stompClient = null; // Make sure this is outside the function if it's global

async function getStompClient() {
    return new Promise(async (resolve, reject) => {
        if (stompClient) {
            resolve(stompClient);
            return;
        }

        const response = await fetch("/config/stomp");
        const config = await response.json();

        stompClient = new StompJs.Client({
            brokerURL: config.brokerUrl,
            onConnect: (frame) => {
                console.log('Connected: ' + frame);

                stompClient.subscribe('/topic/chat', (chat) => {
                    appendMessage(JSON.parse(chat.body));
                });

                stompClient.subscribe('/topic/draw', (draw) => {
                    console.log(draw.body);
                    drawGuestLine(JSON.parse(draw.body));
                });

                stompClient.subscribe("/topic/users", (users) => {
                    console.log(users.body);
                    updateUsers(JSON.parse(users.body));
                });

                stompClient.subscribe('/topic/clear', () => {
                    clearGuests();
                    clearUserBoard();
                });

                resolve(stompClient);
            },
            onWebSocketError: (error) => {
                console.error('Error with websocket', error);
                reject(error);
            },
            onStompError: (error) => {
                console.error('Broker reported error: ' + error.headers['message']);
                console.error('Additional details: ' + error.body);
                reject(error);
            }
        });

        stompClient.activate();
    });
}
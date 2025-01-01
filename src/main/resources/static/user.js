const userstomp= new StompJs.Client({
    brokerURL: 'ws://localhost:8080/game-websocket'
});

userstomp.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    getUsers(localStorage.getItem('userName'));

    userstomp.subscribe("/topic/users", (users) => {
        console.log(users.body);
        updateUsers(JSON.parse(users.body));
    })
}

userstomp.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
}

userstomp.onStompError = (error) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
}

let users = []

function getUsers(name) {
    userstomp.publish({
        destination: "/app/users",
        body: JSON.stringify({
            'userName': name
        })
    });
}

function updateUsers(usersResponse) {
    users = [...usersResponse.users];
}

$(document).ready(function() {
    userstomp.activate();
})
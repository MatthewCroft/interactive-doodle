let users = []

async function getUsers(name) {
    let userstomp = await getStompClient();
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
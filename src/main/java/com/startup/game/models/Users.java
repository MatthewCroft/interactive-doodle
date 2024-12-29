package com.startup.game.models;

import java.util.Set;

public class Users {
    Set<String> users;

    public Users() {}

    public Users(Set<String> users) {
        this.users = users;
    }

    public Set<String> getUsers() {
        return users;
    }
}

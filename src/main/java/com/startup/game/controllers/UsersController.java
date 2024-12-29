package com.startup.game.controllers;

import com.startup.game.models.User;
import com.startup.game.models.Users;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.HashSet;
import java.util.Set;

@Controller
public class UsersController {
    Set<String> users = new HashSet<>();

    @MessageMapping("/users")
    @SendTo("/topic/users")
    public Users addUser(User user) {
       if (users.contains(user.getUserName().toLowerCase())) return new Users(users);

       users.add(user.getUserName().toLowerCase());

       return new Users(users);
    }

    @MessageMapping("/current/users")
    @SendTo("/topic/current/users")
    public Users getUsers() {
        return new Users(users);
    }
}
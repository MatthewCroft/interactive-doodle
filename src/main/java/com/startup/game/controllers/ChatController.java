package com.startup.game.controllers;

import com.startup.game.models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat")
    public String chatIn(Message message) {
       return chatOut(message.getMessage());
    }

    @SendTo("/topic/chat")
    public String chatOut(String message) {
       return message;
    }
}

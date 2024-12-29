package com.startup.game.controllers;

import com.startup.game.models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public Message chatIn(Message message) {
       return chatOut(message);
    }

    public Message chatOut(Message message) {
       return message;
    }
}

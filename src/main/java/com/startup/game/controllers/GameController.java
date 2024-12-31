package com.startup.game.controllers;

import com.startup.game.models.GuestDrawLine;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {
    @MessageMapping("/draw")
    public GuestDrawLine receiveDraw(GuestDrawLine guestDrawLine) {
       return sendDraw(guestDrawLine);
    }

    @SendTo("/topic/draw")
    public GuestDrawLine sendDraw(GuestDrawLine guestDrawLine) {
        return guestDrawLine;
    }

    @MessageMapping("/clear")
    @SendTo("/topic/clear")
    public String clearCanvas() {
        return "Clear";
    }
}

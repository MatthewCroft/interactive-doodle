package com.startup.game.controllers;

import com.startup.game.models.StompBrokerConfig;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StompConfigController {
    @GetMapping("/config/stomp")
    public StompBrokerConfig getBrokerUrl(HttpServletRequest request) {
        String serverPort = request.getServerPort() == 80 || request.getServerPort() == 443 ? "" : String.valueOf(request.getServerPort());
        String brokerUrl = String.format("ws://%s:%s/game-websocket", request.getServerName(), serverPort);
        return new StompBrokerConfig(brokerUrl);
    }
}
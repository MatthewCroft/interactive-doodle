package com.startup.game.controllers;

import com.startup.game.models.StompBrokerConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StompConfigController {
    @Value("${stomp.broker-url}")
    private String brokerUrl;

    @GetMapping("/config/stomp")
    public StompBrokerConfig getBrokerUrl() {
        return new StompBrokerConfig(brokerUrl);
    }
}
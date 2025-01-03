package com.startup.game.models;

public class StompBrokerConfig {
    String brokerUrl;

    public StompBrokerConfig() {}
    public StompBrokerConfig(String brokerUrl) {
        this.brokerUrl = brokerUrl;
    }

    public String getBrokerUrl() {
        return brokerUrl;
    }
}

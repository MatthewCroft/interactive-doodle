package com.startup.game.models;

public class Message {
    String name;
    String message;
    String color;
    public Message() {}
    public Message(String message, String name, String color) {
        this.message = message;
        this.name = name;
        this.color = color;
    }

    public String getColor() {
        return color;
    }

    public String getMessage() {
        return message;
    }

    public String getName() {
        return name;
    }
}

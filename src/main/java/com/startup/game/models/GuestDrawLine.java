package com.startup.game.models;

public class GuestDrawLine {
    String name;
    String currentColor;
    int currentX;
    int currentY;
    int previousX;
    int previousY;

    public GuestDrawLine() {}
    public GuestDrawLine(String name, int currentX, int currentY, int previousX, int previousY, String currentColor) {
        this.name = name;
        this.currentX = currentX;
        this.currentY = currentY;
        this.previousX = previousX;
        this.previousY = previousY;
        this.currentColor = currentColor;
    }

    public String getCurrentColor() {
        return currentColor;
    }

    public String getName() {
        return name;
    }

    public int getPreviousY() {
        return previousY;
    }

    public int getCurrentX() {
        return currentX;
    }

    public int getCurrentY() {
        return currentY;
    }

    public int getPreviousX() {
        return previousX;
    }
}

# Interactive Doodle

A real-time doodle application showing users drawing lines on canvas using WebSockets and STOMP for communication
### Demo
![Demo](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHY3eHpvY3N1ZjZlbmRya3N5amJ6NDczbWp3d3JmanFqeThrbmRhMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JJZTFFpVxgQLnJ5gHJ/giphy.gif)

This demo was created using k6 javascript load testing tool to simulate multiple users interacting with the canvas

## Live Server
https://interactive-doodle-0-0-1-04e68f6a726a.herokuapp.com/

## Features
1. Real time communication of users lines being drawn on canvas
2. Real time chat messages between users

## Technologies Used
1. Spring boot
2. WebSockets and STOMP
3. HTML
4. JavaScript
5. Java

## Installation
You will need Maven and Java 21 in order to build the project

### 1. Clone repository
```bash
git clone https://github.com/MatthewCroft/interactive-doodle.git
```
### 2. Build project
In the root directory do the following command
```bash
mvn clean install
```

###  3. Run project
```bash
java -jar target/Interactive-Doodle-0.0.1.jar
```
you should now be able to access the app at http://localhost:8080/ 

## Run Tests
tests are located in ``src/main/resources/static/test``
The HTML files are mocha tests, you can open them directly in the browser to run them

``loadtest.js`` is the same load test that is used in the demo above.
### Run load test
1. install ``k6``, by doing 
```bash
brew install k6
```
2. make sure you are in the ``src/main/resources/static/test`` then run the command
```bash 
k6 run loadtest.js
```

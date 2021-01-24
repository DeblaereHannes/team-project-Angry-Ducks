// welcome to the wonderfull world of arduino, johnney-five and node.js
//
// this code is made to control 2 button's on a arduino via node.js for the angry ducks school team project
// communication between the arduino and the node.js server happens via usb
// communication between the browser and the node.js server happens via mqtt
//
// quick explanation on what gets and needs to be send via mqtt:
//
// when the script is started it will send  {"board" : "connected"}
// note the board takes a bit to get ready after this and it doesnt send a msg when the connection fails
//
// if you want to ready up a player you can use {"ready" : "XXXX"}
// on the "XXXX" you pick either "1", "2", "both" or "none"
// the "none" value can be used to unready both players recommened to do this after closing a gamemode
//
// when a button is pressed and that button is ready {"launch" : "X"} gets send out
// on the "X" it will give either "1" or "2" depending on who launched



var mqtt = require('mqtt')
var client = mqtt.connect('ws://broker.emqx.io:8083/mqtt')
var topic = '/angryducks/buttons'

var five = require("johnny-five"),
    board = new five.Board(),
    button1,
    button2,
    led1,
    led2,
    express = require('express'),
    app = express(),
    port = 8000;

var ready1 = false;
var ready2 = false;

client.on('connect', function() {
    client.subscribe(topic, function(err) {
        if (!err) {
            client.publish(topic, '{"board" : "connected"}')
        }
    })
})

/*client.on('message', function(topic, message) {
    // message is Buffer
    console.log(message.toString())
        // client.end()
}) */

board.on("ready", function() {
    button1 = new five.Button(8);
    button2 = new five.Button(4);
    led1 = new five.Led(7);
    led2 = new five.Led(9);

    button1.on("down", function() {
        console.log("player 1 status: pressed button");
        if (ready1 == true) {
            console.log("player 1 status: launched");
            client.publish(topic, '{"launch" : "1"}');
            led1.blink();
            ready1 = false;
            setTimeout(() => {
                led1.stop();
                led1.off();
            }, 2000);
        } else {
            console.log("player 1 status: failed to launch, player not ready yet")
        }
    });

    button2.on("down", function() {
        console.log("player 2 status: pressed button");
        if (ready2 == true) {
            console.log("player 2 status: launched");
            client.publish(topic, '{"launch" : "2"}');
            led2.blink();
            ready2 = false;
            setTimeout(() => {
                led2.stop();
                led2.off();
            }, 2000);
        } else {
            console.log("player 2 status: failed to launch, player not ready yet")
        }
    });
});

client.on('message', function(topic, message) {
    // message is Buffer
    //console.log(message.toString())
    var status = "OK";
    var player = JSON.parse(message);
    switch (player.ready) {
        case "1":
            ready1 = true;
            led1.on();
            status = "player 1 status: ready";
            break;
        case "2":
            ready2 = true;
            led2.on();
            status = "player 2 status: ready";
            break;
        case "both":
            ready1 = true;
            ready2 = true;
            led1.on();
            led2.on();
            status = "player 1 & 2 status: ready";
            break;
        case "none":
            ready1 = false;
            ready2 = false;
            led1.off();
            led2.off();
            status = "player 1 & 2 status: not ready";
            break;
        default:
            if (player.ready === undefined) {
                status = "Unknown mqtt payload key: " + message.toString();
            } else {
                status = "Unknown mqtt payload value: " + player.ready;
            }
            break;
    }
    console.log(status);
})

app.listen(port, function() {
    console.log('Listening on port: ' + port);
});
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://13.81.105.139')
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
            client.publish(topic, 'Hello mqtt')
        }
    })
})

client.on('message', function(topic, message) {
    // message is Buffer
    console.log(message.toString())
        // client.end()
})

board.on("ready", function() {
    button1 = new five.Button(2);
    button2 = new five.Button(3);
    led1 = new five.Led(13);
    led2 = new five.Led(5);

    button1.on("down", function() {
        if (ready1 == true) {
            console.log("1 launch");
            client.publish(topic, '{"player" : "1"}');
            led1.blink();
            ready1 = false;
            setTimeout(() => {
                led1.stop();
                led1.off();
            }, 2000);
        } else {
            console.log("1 fail")
        }
    });

    button2.on("down", function() {
        if (ready2 == true) {
            console.log("2 launch");
            client.publish(topic, '{"player" : "2"}');
            led2.blink();
            ready2 = false;
            setTimeout(() => {
                led2.stop();
                led2.off();
            }, 2000);
        } else {
            console.log("2 fail")
        }
    });
});

app.get('/:mode', function(req, res) {
    if (led1) {
        var status = "OK";
        switch (req.params.mode) {
            case "player1":
                ready1 = true;
                led1.on();
                status = "player 1 ready";
                break;
            case "player2":
                ready2 = true;
                led2.on();
                status = "player 2 ready";
                break;
            case "reset":
                ready1 = true;
                ready2 = true;
                led1.on();
                led2.on();
                status = "players reset";
                break;
            case "favicon.ico":
                status = "------------------------";
                break;
            default:
                status = "Unknown: " + req.params.mode;
                break;
        }
        //console.log(req.params.mode);
        console.log(status);
        res.send(status);
    } else {
        res.send('Board NOT ready!')
    }
});

app.listen(port, function() {
    console.log('Listening on port ' + port);
});
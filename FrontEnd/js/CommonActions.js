//#region ***  Variablen ***

let chosenHeartRateService = null;
var HR, HR2, player2enable = false,
    player2plays = false;
var showPauseMenu = false,
    ShowReconnectionScreen = false,
    btnPause, btnExit, bluetoothConnected = false,
    bluetoothConnected2 = false,
    timeStampHR, timeStampHR2;
var canShoot, CalmHR, CalmHR2, ShootHR, duckPlayer1 = 0,
    duckPlayer2 = 3,
    gamePicture = 1,
    gameScore = 4,
    canAlert = true,
    hearts, isHeart1Red = false,
    isHeart2Red = false;

var characters = ["", "", "", "", "", "", "", "", ""],
    gameSelections = ["", "", "", ""];
for (link of characters) {
    link = document.createElement('character');
}
characters[0] = "./img/characters/Duck_Male1.png";
characters[1] = "./img/characters/Duck_Male2.png";
characters[2] = "./img/characters/Duck_Male3.png";
characters[3] = "./img/characters/Duck_Female1.png";
characters[4] = "./img/characters/Duck_Female2.png";
characters[5] = "./img/characters/Duck_Female3.png";
characters[6] = "./img/characters/Duck_White.png";
characters[7] = "./img/characters/Duck_Yellow.png";
characters[8] = "./img/characters/Duck_Gray.png";

for (link of gameSelections) {
    link = document.createElement('gameSelection');
}
gameSelections[0] = "./img/gameselection/imgGamemode1.png";
gameSelections[1] = "./img/gameselection/imgGamemode2.png";
gameSelections[2] = "./img/gameselection/imgGamemode3.png";
gameSelections[3] = "./img/gameselection/imgGamemode4.png";
gameSelections[4] = "./img/gameselection/imgGamemode5.png";

//#endregion

//#region *** Start Function ***

const start = function() {
    //tijd aanleggen
    if (secondsPast == 0 && showPauseMenu == false && ShowReconnectionScreen == false) { //timer kan niet aan worden gelegd als die al aan staat (vermijd meermaals schieten)
        timerOn = true;
        canShoot = true;
    }
}

//#endregion

//#region *** Shoot Function ***

const shoot = function(wichbutton) {
    //ophalen van snelheid (slider ingesteld in html: 1-6)
    if (canShoot == true && showPauseMenu == false && ShowReconnectionScreen == false) {
        //console.log(speed);
        checkScore = score; //checkScore gelijkstellen zodat de score niet blijft -100 ofzo doen als de hitbox de detection raakt

        if (player2plays == true && wichbutton == 2 && player2enable == true) {
          //var speed = 6.7;  
          if (HR2 != null) {
                ShootHR = (HR2 - CalmHR2) / 5;
                var speed = ShootHR; //6.7;
            } else {
                console.error("no HR");
            }
            canShoot = false;
            duckP2.gravity = 0.075; //zwaartekracht aanmaken zodat de eend valt
            duckP2.speedX = speed; //horizontale snelheid volgens de slider waarde
            duckP2.speedY = -3; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)

            duckHitbox.gravity = 0.075;
            duckHitbox.speedX = speed;
            duckHitbox.speedY = -3;
            checkSecondsPast = secondsPast;
        } else if (player2plays == false && wichbutton == 1 && player2enable == true) {
          //var speed = 6.7;
            if (HR != null) {
                ShootHR = (HR - CalmHR) / 5;
                var speed = ShootHR; //6.7;
            } else {
                console.error("no HR");
            }
            canShoot = false;
            duckP1.gravity = 0.075; //zwaartekracht aanmaken zodat de eend valt
            duckP1.speedX = speed; //horizontale snelheid volgens de slider waarde
            duckP1.speedY = -3; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)

            duckHitbox.gravity = 0.075;
            duckHitbox.speedX = speed;
            duckHitbox.speedY = -3;
            checkSecondsPast = secondsPast;
        } else if (player2enable == false && wichbutton == 1) {
          //var speed = 6.7; 
          if (HR != null) {
                ShootHR = (HR - CalmHR) / 5;
                var speed = ShootHR; //6.7;
            } else {
                console.error("no HR");
            }
            canShoot = false;
            duckP1.gravity = 0.075; //zwaartekracht aanmaken zodat de eend valt
            duckP1.speedX = speed; //horizontale snelheid volgens de slider waarde
            duckP1.speedY = -3; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)

            duckHitbox.gravity = 0.075;
            duckHitbox.speedX = speed;
            duckHitbox.speedY = -3;
            checkSecondsPast = secondsPast;
        } else if ( wichbutton == 3) {
          //var speed = 6.7;
            if (HR != null) {
                ShootHR = (HR - CalmHR) / 5;
                var speed = ShootHR; //6.7
            } else {
                console.error("no HR");
            }
            canShoot = false;
            duckP1.gravity = 0.14; //zwaartekracht aanmaken zodat de eend valt
            duckP1.speedX = speed; //horizontale snelheid volgens de slider waarde
            duckP1.speedY = -1; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)

            duckHitbox.gravity = 0.14;
            duckHitbox.speedX = speed;
            duckHitbox.speedY = -1;
            checkSecondsPast = secondsPast;
        }else if(wichbutton == 4){
          var speed = 6.7;  
          if (HR2 != null) {
              ShootHR = (HR2 - CalmHR2) / 5;
              var speed = ShootHR; //6.7
            } else {
                console.error("no HR");
            }
            canShoot = false;
            duckP2.gravity = 0.14; //zwaartekracht aanmaken zodat de eend valt
            duckP2.speedX = speed; //horizontale snelheid volgens de slider waarde
            duckP2.speedY = -1; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)

            duckHitbox.gravity = 0.14;
            duckHitbox.speedX = speed;
            duckHitbox.speedY = -1;
            checkSecondsPast = secondsPast;
            }
      }
  }

//#endregion

//#region *** Reload 2 duck Function ***

const reload = function() {
    //locatie eend resetten
    if (secondsPast != 0 && showPauseMenu == false && ShowReconnectionScreen == false) {
        if (player2enable == true) {
            player2plays = !player2plays;
            if (player2plays == true) {
                duckP2.x = (viewport * 0.07);
                duckP2.y = (viewportHeight * 0.425);
                duckP2.speedY = 0;
                duckP2.gravitySpeed = 0;
                duckP2.gravity = 0;
                duckP2.amounthitbottom = 0;
                duckHitbox.x = (viewport * 0.0925);
                duckHitbox.y = (viewportHeight * 0.515);
                duckHitbox.speedY = 0;
                duckHitbox.gravitySpeed = 0;
                duckHitbox.gravity = 0;
                duckP1.x = (viewport * 0.01);
                duckP1.y = (viewportHeight * 0.6);
                duckP1.speedY = 0;
                duckP1.gravitySpeed = 0;
                duckP1.gravity = 0;
            } else {
                duckP1.x = (viewport * 0.07);
                duckP1.y = (viewportHeight * 0.425);
                duckP1.speedY = 0;
                duckP1.gravitySpeed = 0;
                duckP1.gravity = 0;
                duckP1.amounthitbottom = 0;
                duckHitbox.x = (viewport * 0.0925);
                duckHitbox.y = (viewportHeight * 0.515);
                duckHitbox.speedY = 0;
                duckHitbox.gravitySpeed = 0;
                duckHitbox.gravity = 0;
                duckP2.x = (viewport * 0.01);
                duckP2.y = (viewportHeight * 0.6);
                duckP2.speedY = 0;
                duckP2.gravitySpeed = 0;
                duckP2.gravity = 0;
            }


        } else {
            duckP1.x = (viewport * 0.07);
            duckP1.y = (viewportHeight * 0.425);
            duckP1.speedY = 0;
            duckP1.gravitySpeed = 0;
            duckP1.amounthitbottom = 0;
            duckHitbox.x = (viewport * 0.0925);
            duckHitbox.y = (viewportHeight * 0.515);
            duckHitbox.speedY = 0;
            duckHitbox.gravitySpeed = 0;
            duckHitbox.gravity = 0;
        }
        canShoot = true;
    }
}

//#endregion 

//#region *** restart game function ***

const refresh = function(number = 0) {
    pauseXduck = 0;
    pauseYduck = 0;
    pauseXhitbox = 0;
    pauseYhitbox = 0;
    CanvasBlur = false;
    timerOn = false; //tijd terug uit zetten
    canShoot = false; //niet shieten tijdens reset
    document.querySelector(".js-pause").style.display = "block";
    document.querySelector(".js-VictoryScreen").style.visibility = "hidden";
    myGameArea.stop(); //canvas freezen
    if (number == 0) loadCorrectGame();
    //volledige game terug aanmaken
}

//#endregion

//#region *** set rusthartslag function ***

const rusthartslag = function() {
    CalmHR = HR; //rusthartslag gelijkstellen aan hartslag
    document.querySelector('.js-heartrateP1').innerHTML = CalmHR;
    if ((document.querySelector(".js-1speler").classList.contains("ishidden"))) {
        if (CalmHR2 > 0) {
            document.querySelector(".js-togamemodeselect").style.backgroundColor = "#F88F3E";
        }
    } else {
        if (CalmHR > 0) {
            document.querySelector(".js-togamemodeselect").style.backgroundColor = "#F88F3E";
        }
    }
}

const rusthartslag2 = function() {
    CalmHR2 = HR2;
    document.querySelector('.js-heartrateP2').innerHTML = CalmHR2;
    if (CalmHR > 0) {
        document.querySelector(".js-togamemodeselect").style.backgroundColor = "#F88F3E";
    }
}

//#endregion

//#region *** characterSelection function ***

const characterSelection = function(Number) {
    var check = false;
    if ((document.querySelector(".js-1speler").classList.contains("ishidden"))) //als speler 2 niet hidden is
    {
        while (duckPlayer1 == duckPlayer2 || check == false) {
            switch (Number) {

                case 1:
                    duckPlayer1--;
                    if (duckPlayer1 == -1) duckPlayer1 = 8;
                    break; //player 1 left
                case 2:
                    duckPlayer1++;
                    if (duckPlayer1 == 9) duckPlayer1 = 0;
                    break; //player 1 right
                case 3:
                    duckPlayer2--;
                    if (duckPlayer2 == -1) duckPlayer2 = 8;
                    break; //player 2 left
                case 4:
                    duckPlayer2++;
                    if (duckPlayer2 == 9) duckPlayer2 = 0;
                    break; //player 2 right

            }
            check = true;
        }
    } else {
        switch (Number) {
            case 1:
                duckPlayer1--;
                if (duckPlayer1 == -1) duckPlayer1 = 8;
                break; //player 1 left
            case 2:
                duckPlayer1++;
                if (duckPlayer1 == 9) duckPlayer1 = 0;
                break; //player 1 right   
        }
    }
    document.getElementById("0").src = characters[duckPlayer1];
    document.getElementById("1").src = characters[duckPlayer1];
    document.getElementById("2").src = characters[duckPlayer2];
    document.getElementById("DuckP1Connect").src = characters[duckPlayer1];
    document.getElementById("DuckP2Connect").src = characters[duckPlayer2];
}


//#endregion
//#region *** scoreSelection function ***

const scoreSelection = function(Number) {
    switch (Number) {
        case 1:
            gameScore--;
            if (gameScore == -1) gameScore = 4;
            break; //player 1 left
        case 2:
            gameScore++;
            if (gameScore == 5) gameScore = 0;
            break; //player 1 right  
    }
    switch (gameScore) {
        case 0:
            document.getElementById("gameModeScore").innerHTML = "Solo";
            document.getElementById("gameTitleScore").innerHTML = "Snel Eendje";
            loadscores("solo-snel-eendje", "t")
            break;
        case 1:
            document.getElementById("gameModeScore").innerHTML = "Solo";
            document.getElementById("gameTitleScore").innerHTML = "Ver Vliegen";
            loadscores("solo-ver-vliegen", "s")
            break;
        case 2:
            document.getElementById("gameModeScore").innerHTML = "Versus";
            document.getElementById("gameTitleScore").innerHTML = "Brood Oorlog";
            loadscores("versus-brood-oorlog", "s")
            break;
        case 3:
            document.getElementById("gameModeScore").innerHTML = "Versus";
            document.getElementById("gameTitleScore").innerHTML = "Ver Vliegen";
            loadscores("versus-ver-vliegen", "s")
            break;
        case 4:
            document.getElementById("gameModeScore").innerHTML = "Co-op";
            document.getElementById("gameTitleScore").innerHTML = "Doelwit Verquakelen";
            loadscores("coop-doelwit-verquackelen", "t")
            break;
    }
}

//#endregion

//#region *** loadscores function ***

const loadscores = function(gamemodename, sortvalue) {
    var request = new XMLHttpRequest()

    request.open('GET', 'https://angry-ducks-api.azurewebsites.net/api/gamemode/' + gamemodename, true)
    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
            //console.log(data)

        if (request.status >= 200 && request.status < 400) {
            var request1 = new XMLHttpRequest()

            request1.open('GET', 'https://angry-ducks-api.azurewebsites.net/api/scoreboard/' + data, true)
            request1.onload = function() {
                // Begin accessing JSON data here
                var data1 = JSON.parse(this.response)

                if (request1.status >= 200 && request1.status < 400) {
                    if (sortvalue == "s") {
                        data1.sort(function(a, b) {
                            return parseFloat(a.score) + parseFloat(b.score);
                        });
                        document.querySelector(".js-scoreboard-container").innerHTML = "";
                        for (let i = 0; i < 5; i++) {
                            const e = data1[i];
                            if (e != null) {
                                document.querySelector(".js-scoreboard-container").innerHTML += '<div class="score-container"> <div class = "score-position" >' + (i + 1) + '.</div> <div class = "score-name" >' + e.name + '</div> <div class = "score-points" >' + e.score + 'pt</div> </div >';
                            }
                        }
                    } else if (sortvalue == "t") {
                        data1.sort(function(a, b) {
                            return parseFloat(a.time) - parseFloat(b.time);
                        });
                        //console.log(data1)
                        document.querySelector(".js-scoreboard-container").innerHTML = "";
                        for (let i = 0; i < 5; i++) {
                            const e = data1[i];
                            if (e != null) {
                                document.querySelector(".js-scoreboard-container").innerHTML += '<div class="score-container"> <div class = "score-position" >' + (i + 1) + '.</div> <div class = "score-name" >' + e.name + '</div> <div class = "score-points" >' + e.time + 'sec</div> </div >';
                            }
                        }
                        //console.log(data1)
                    }
                } else {
                    console.log('error')
                }
            }

            request1.send()
        } else {
            console.log('error')
        }
    }

    request.send()
}

//#endregion

//#region *** gameSelection function ***

const gameSelection = function(Number) {
    if ((document.querySelector(".js-1speler").classList.contains("ishidden"))) //2 spelers
    {
        switch (Number) {
            case 1:
                gamePicture--;
                if (gamePicture == 1) gamePicture = 4;
                break; //left
            case 2:
                gamePicture++;
                if (gamePicture == 5) gamePicture = 2;
                break; //right
        }
        switch (gamePicture) {
            case 2:
                document.getElementById("gameMode").innerHTML = "Versus";
                document.getElementById("gameTitle").innerHTML = "Brood Oorlog";
                break;
            case 3:
                document.getElementById("gameMode").innerHTML = "Versus";
                document.getElementById("gameTitle").innerHTML = "Ver Vliegen";
                break;
            case 4:
                document.getElementById("gameMode").innerHTML = "Co-op";
                document.getElementById("gameTitle").innerHTML = "Doelwit Verquakelen";
                break;
        }

        document.getElementById("gamepicture").src = gameSelections[gamePicture];
    } else //1 speler
    {
        switch (Number) {
            case 1:
                gamePicture--;
                if (gamePicture == -1) gamePicture = 1;
                break; //left
            case 2:
                gamePicture++;
                if (gamePicture == 2) gamePicture = 0;
                break; //right
        }
        switch (gamePicture) {
            case 0:
                document.getElementById("gameMode").innerHTML = "Solo";
                document.getElementById("gameTitle").innerHTML = "Doelwit Verquackelen";
                break;
            case 1:
                document.getElementById("gameMode").innerHTML = "Solo";
                document.getElementById("gameTitle").innerHTML = "Ver Vliegen";
                break;
        }
        document.getElementById("gamepicture").src = gameSelections[gamePicture];
    }
}

//#endregion

//#region *** pause menu functions ***

const listenToButtons2 = function() {
    btnExit.addEventListener("click", function() {
        hidePauseMenu();
    });
    btnPause.addEventListener("click", function() {
        if (ShowReconnectionScreen == false) {
            showPauseMenu = true;
            document.body.classList.add("bgGamemode--blur");
            CanvasBlur = true;
        }
    });
}

const init2 = function() {
    btnPause = document.querySelector(".js-pause");
    btnExit = document.querySelector(".js-exit");
    listenToButtons2();
}
const hidePauseMenu = function() {
    showPauseMenu = false;
    document.body.classList.remove("bgGamemode--blur");
    CanvasBlur = false;
}

const hideReconnectionWindow = function() {
    canAlert = true;
    document.querySelector(".js-ShowConnectionWindow").style.fill = "#EE1C25";
    document.querySelector(".js-togamemodeselect").style.fill = "#F88F3E";
    document.querySelector(".js-connect").style.visibility = "hidden";
    ShowReconnectionScreen = false;
    document.body.classList.remove("bgGamemode--blur");
    backtohome.classList.remove("homescreen--blur");
    document.querySelector(".js-selectioncontainer").classList.remove("homescreen--blur");
    CanvasBlur = false;
}

document.addEventListener("DOMContentLoaded", init2);

//#endregion

//#region *** BT connection functions ***
// hearts = document.querySelectorAll('.js-BTConnection');

// for(let heart of hearts){
//   heart.addEventListener("click", function(){
//   BTconnection();
//   })
// }


const BTconnection = function() {

    //opent de bluetooth interface van google waar je aparaten kan koppelen
    navigator.bluetooth.requestDevice({
            filters: [{
                    services: ['heart_rate'],
                }] //vanaf hier paar instellingen die ik niet versta but it works :)
        }).then(device => device.gatt.connect())
        .then(server => server.getPrimaryService('heart_rate'))
        .then(service => {
            chosenHeartRateService = service;
            return Promise.all([
                service.getCharacteristic('heart_rate_measurement')
                .then(handleHeartRateMeasurementCharacteristic),
            ]);
        });
};

const handleHeartRateMeasurementCharacteristic = function(characteristic) {
    document.querySelector(".js-brothistestm8").style.fill = "#EE1C25";
    isHeart1Red = true;

    if ((document.querySelector(".js-1speler").classList.contains("ishidden"))) //2 spelers
    {
        if (isHeart1Red == true && isHeart2Red == true) {
            document.querySelector(".js-ShowConnectionWindow").style.fill = "#EE1C25";
            document.querySelector(".js-text").innerHTML = "Klik het hartje om je rusthartslag te meten.";
        } else document.querySelector(".js-text").innerHTML = "Verbind de nodige hartslagmeters."
    } else {
        if (isHeart1Red == true) {
            document.querySelector(".js-ShowConnectionWindow").style.fill = "#EE1C25";
            document.querySelector(".js-text").innerHTML = "Klik het hartje om je rusthartslag te meten.";
        } else document.querySelector(".js-text").innerHTML = "Verbind de nodige hartslagmeter.";
    }

    document.querySelector(".js-heartrateP1").classList.remove("ishidden");
    bluetoothConnected = true;
    return characteristic.startNotifications()
        .then(char => {
            characteristic.addEventListener('characteristicvaluechanged', onHeartRateChanged); //live heart rate
        });
}

const onHeartRateChanged = function(event) { //wordt om de __ seconden uitgevoerd om HR aan te passen
    const characteristic = event.target;
    timeStampHR = event.timeStamp;
    HR = parseHeartRate(characteristic.value).heartRate;
    document.querySelector(".js-GMheartrateP1").innerHTML = HR;
    updateHeartRateColor();
}

const BTconnection2 = function() {
    //opent de bluetooth interface van google waar je aparaten kan koppelen
    navigator.bluetooth.requestDevice({
            filters: [{
                services: ['heart_rate'],
            }]
        }).then(device => device.gatt.connect()) //vanaf hier paar instellingen die ik niet versta
        .then(server => server.getPrimaryService('heart_rate'))
        .then(service => {
            chosenHeartRateService = service;
            return Promise.all([
                service.getCharacteristic('heart_rate_measurement')
                .then(handleHeartRateMeasurementCharacteristic2),
            ]);
        });
};

const handleHeartRateMeasurementCharacteristic2 = function(characteristic) {
    document.querySelector(".js-brothistestm9").style.fill = "#EE1C25";
    isHeart2Red = true;

    if ((document.querySelector(".js-1speler").classList.contains("ishidden"))) //2 spelers
    {
        if (isHeart1Red == true && isHeart2Red == true) {
            document.querySelector(".js-ShowConnectionWindow").style.fill = "#EE1C25";
            document.querySelector(".js-text").innerHTML = "Klik het hartje om je rusthartslag te meten.";
        } else document.querySelector(".js-text").innerHTML = "Verbind de nodige hartslagmeters.";
    }

    document.querySelector(".js-heartrateP2").classList.remove("ishidden");
    bluetoothConnected2 = true;
    return characteristic.startNotifications()
        .then(char => {
            characteristic.addEventListener('characteristicvaluechanged', onHeartRateChanged2);
        });
}

function onHeartRateChanged2(event) {
    const characteristic = event.target;
    timeStampHR2 = event.timeStamp;
    HR2 = parseHeartRate(characteristic.value).heartRate;
    document.querySelector(".js-GMheartrateP2").innerHTML = HR2;
    updateHeartRateColor();
}

function parseHeartRate(data) { //functie die de heartrate leesbaar maakt
    const flags = data.getUint8(0);
    const rate16Bits = flags & 0x1;
    const result = {};
    let index = 1;
    if (rate16Bits) {
        result.heartRate = data.getUint16(index, /*littleEndian=*/ true);
        index += 2;
    } else {
        result.heartRate = data.getUint8(index);
        index += 1;
    }
    const contactDetected = flags & 0x2;
    const contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
        result.contactDetected = !!contactDetected;
    }
    const energyPresent = flags & 0x8;
    if (energyPresent) {
        result.energyExpended = data.getUint16(index, /*littleEndian=*/ true);
        index += 2;
    }
    const rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
        const rrIntervals = [];
        for (; index + 1 < data.byteLength; index += 2) {
            rrIntervals.push(data.getUint16(index, /*littleEndian=*/ true));
        }
        result.rrIntervals = rrIntervals;
    }
    return result;
}

//#endregion

//#region *** BT disconnect function ***

const checkBTconnection = function() {
    if (bluetoothConnected == true) {
        if (previousTimestampHR == timeStampHR && canAlert == true) {
            canAlert = false;
            if (bluetoothConnected2 == true) alert(`Oeps, ${mpname.value} is weggevlogen! 🦆`);
            else alert(`Oeps, ${spname.value} is weggevlogen! 🦆`);
            CanvasBlur = true;
            document.querySelector(".js-brothistestm8").style.fill = "#4A4A4A";
            isHeart1Red = false;
            document.querySelector(".js-heartrateP1").classList.add("ishidden");
            ShowReconnectionWindow();
        }
    }
    previousTimestampHR = timeStampHR;
    if (bluetoothConnected2 == true) {
        if (previousTimestampHR2 == timeStampHR2 && canAlert == true) {
            canAlert = false;
            alert(`Oeps, ${p2name.value} is weggevlogen! 🦆`);
            CanvasBlur = true;
            document.querySelector(".js-brothistestm9").style.fill = "#4A4A4A";
            isHeart2Red = false;
            ShowReconnectionWindow();
        }
    }
    previousTimestampHR2 = timeStampHR2;
}

const ShowReconnectionWindow = function() {
    showPauseMenu = false;
    ShowReconnectionScreen = true;
    document.querySelector(".js-connect").style.visibility = "visible";
    backtohome.classList.add("homescreen--blur");
    document.querySelector(".js-selectioncontainer").classList.add("homescreen--blur");
    document.body.classList.add("bgGamemode--blur"); //victory screen unhiden

}

//#endregion
//#region *** heartrate color ***
const updateHeartRateColor = function() {
        switch ((HR - CalmHR) / 5) {
            case 6.0:
            case 6.1:
            case 6.2:
            case 7.5:
            case 7.6:
            case 7.7: //oranje
                document.querySelector(".js-GMheartrateP1").style.color = "#F88F3E";
                break;
            case 6.3:
            case 7.2:
            case 7.3:
            case 7.4: //geel
                document.querySelector(".js-GMheartrateP1").style.color = "#EEFF00";
                break;
            case 6.6:
            case 6.7:
            case 6.8:
            case 6.9:
            case 7.0:
            case 7.1: //groen
                document.querySelector(".js-GMheartrateP1").style.color = "#00FF00";
                break;
            default: //rood
                document.querySelector(".js-GMheartrateP1").style.color = "#EE1C25";
                break;
        }

        switch ((HR2 - CalmHR2) / 5) {
            case 6.0:
            case 6.1:
            case 6.2:
            case 7.5:
            case 7.6:
            case 7.7: //oranje
                document.querySelector(".js-GMheartrateP2").style.color = "#F88F3E";
                break;
            case 6.3:
            case 7.2:
            case 7.3:
            case 7.4: //geel
                document.querySelector(".js-GMheartrateP2").style.color = "#EEFF00";
                break;
            case 6.6:
            case 6.7:
            case 6.8:
            case 6.9:
            case 7.0:
            case 7.1: //groen
                document.querySelector(".js-GMheartrateP2").style.color = "#00FF00";
                break;
            default: //rood
                document.querySelector(".js-GMheartrateP2").style.color = "#EE1C25";
                break;
        }
    }
    //#endregion
    //#region *** load correct game***
const loadCorrectGame = function() {
        switch (gamePicture) {
            case 0:
                player2enable = false;
                loadGame();
                break;
            case 1:
                player2enable = false;
                loadGamemode3();
                break;
            case 2:
                player2enable = true;
                loadGame();
                break;
            case 3:
                player2enable = true;
                loadGamemode3();
                break;
            case 4:
                player2enable = true;
                loadGame();
                break;
            default:
                loadGame();
                break;
        }
    }
    //#endregion

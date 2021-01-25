//#region ***  Variablen ***

let chosenHeartRateService = null;
var HR, HR2, player2enable = false,
    player2plays = false;
var showPauseMenu = false,
    ShowReconnectionScreen = false,
    btnPause, btnExit, bluetoothConnected = false,
    bluetoothConnected2 = false,
    timeStampHR, timeStampHR2;
var canShoot = false,
    CalmHR = 1000,
    CalmHR2 = 1000,
    ShootHR, duckPlayer1 = 0,
    duckPlayer2 = 3,
    gamePicture = 1,
    gameScore = 3,
    canAlert = true,
    hearts, isHeart1Red = false,
    isHeart2Red = false,
    VarGravity, VarSpeedy;
var characters = ["", "", "", "", "", "", "", "", ""],
    gameSelections = ["", "", "", ""];
for (link of characters) {
    link = document.createElement('character');
}
characters[0] = "/Duck_Male1.png";
characters[1] = "/Duck_Male2.png";
characters[2] = "/Duck_Male3.png";
characters[3] = "/Duck_Female1.png";
characters[4] = "/Duck_Female2.png";
characters[5] = "/Duck_Female3.png";
characters[6] = "/Duck_White.png";
characters[7] = "/Duck_Yellow.png";
characters[8] = "/Duck_Gray.png";
characters[9] = "/Duck_Black.png";
characters[10] = "/Duck_Blue.png";
characters[11] = "/Duck_CyanParakeet.png";
characters[12] = "/Duck_GrayParakeet.png";
characters[13] = "/Duck_LimeParakeet.png";
characters[14] = "/Duck_Pink.png";
characters[15] = "/Duck_Rainbow.png";
characters[16] = "/Duck_Red.png";

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
        MQTTSendReload("1");
    }
}

//#endregion

//#region *** Shoot Function ***

const shoot = function(whichbutton) {
    //ophalen van snelheid (slider ingesteld in html: 1-6)
    if (showPauseMenu == false && ShowReconnectionScreen == false) {
        checkScore = score; //checkScore gelijkstellen zodat de score niet blijft -100 ofzo doen als de hitbox de detection raakt
        checkScore2 = score1;

        if (whichbutton == 1 && canShoot == true) {
            var speed = 6.7;
            if (HR != null) {
                ShootHR = (HR - CalmHR) / 5;
                var speed = ShootHR; //6.7;
            } else {
                console.error("no HR");
            }
            canShoot = false;
            duckP1.gravity = VarGravity; //zwaartekracht aanmaken zodat de eend valt
            duckP1.speedX = speed; //horizontale snelheid volgens de slider waarde
            duckP1.speedY = VarSpeedy; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)

            duckHitbox.gravity = VarGravity;
            duckHitbox.speedX = speed;
            duckHitbox.speedY = VarSpeedy;
            checkSecondsPast = secondsPast;
        } else if (whichbutton == 0 && canShoot2 == true) {
            var speed = 6.7;
            if (HR2 != null) {
                ShootHR = (HR2 - CalmHR2) / 5;
                var speed = ShootHR; //6.7;
            } else {
                console.error("no HR2");
            }
            canShoot2 = false;
            if (VarNeg == true) {
                duckP2.speedX = -speed; //horizontale snelheid volgens de slider waarde
                duckHitbox2.speedX = -speed;
            } else {
                duckP2.speedX = speed; //horizontale snelheid volgens de slider waarde
                duckHitbox2.speedX = speed;
            }
            duckP2.gravity = VarGravity; //zwaartekracht aanmaken zodat de eend valt
            duckP2.speedY = VarSpeedy; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)

            duckHitbox2.gravity = VarGravity;
            duckHitbox2.speedY = VarSpeedy;
            checkSecondsPast = secondsPast;
        }
    }
}

//#endregion

//#region *** Reload 2 duck Function ***

const reload = function(D1, DH1, D2, DH2) {
    //locatie eend resetten
    if (secondsPast != 0 && showPauseMenu == false && ShowReconnectionScreen == false) {
        D1.x = (viewport * 0.07);
        D1.y = (viewportHeight * 0.425);
        D1.speedY = 0;
        D1.gravitySpeed = 0;
        D1.gravity = 0;
        D1.amounthitbottom = 0;
        DH1.x = (viewport * 0.0925);
        DH1.y = (viewportHeight * 0.515);
        DH1.speedY = 0;
        DH1.gravitySpeed = 0;
        DH1.gravity = 0;
        if (D2 != null) {
            D2.x = (viewport * 0.01);
            D2.y = (viewportHeight * 0.6);
            D2.speedY = 0;
            D2.gravitySpeed = 0;
            D2.gravity = 0;
            D2.amounthitbottom = 0;
        }
        if(DH2 != null){
            DH2.x = 0;
            DH2.y = 0;
        }
    }
}

//#endregion 

//#region *** restart game function ***

const refresh = function(number = 0) {
    pauseXduck = 0;
    pauseYduck = 0;
    pauseXhitbox = 0;
    pauseYhitbox = 0;
    document.getElementById("js-score").classList.remove("ishidden");
    CanvasBlur = false;
    timerOn = false; //tijd terug uit zetten
    canShoot = false; //niet shieten tijdens reset
    document.querySelector(".js-pause").style.display = "block";
    document.querySelector(".js-VictoryScreen").style.visibility = "hidden";
    document.querySelector(".c-live-heart-rates").classList.remove("game--blur");
    myGameArea.stop(); //canvas freezen
    if (number == 0) loadCorrectGame();
    //volledige game terug aanmaken
}

//#endregion

//#region *** set rusthartslag function ***

const rusthartslag = function() {
    if (HR > 30 && CalmHR > HR) {
        CalmHR = HR; //rusthartslag gelijkstellen aan hartslag
        document.querySelector('.js-heartrateP1').innerHTML = CalmHR;
    }
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
    if (HR2 > 30 && CalmHR2 > HR2) {
        CalmHR2 = HR2;
        document.querySelector('.js-heartrateP2').innerHTML = CalmHR2;
    }
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
                    if (duckPlayer1 == -1) duckPlayer1 = 16;
                    break; //player 1 left
                case 2:
                    duckPlayer1++;
                    if (duckPlayer1 == 17) duckPlayer1 = 0;
                    break; //player 1 right
                case 3:
                    duckPlayer2--;
                    if (duckPlayer2 == -1) duckPlayer2 = 16;
                    break; //player 2 left
                case 4:
                    duckPlayer2++;
                    if (duckPlayer2 == 17) duckPlayer2 = 0;
                    break; //player 2 right
            }
            check = true;
        }
    } else {
        switch (Number) {
            case 1:
                duckPlayer1--;
                if (duckPlayer1 == -1) duckPlayer1 = 16;
                break; //player 1 left
            case 2:
                duckPlayer1++;
                if (duckPlayer1 == 17) duckPlayer1 = 0;
                break; //player 1 right   
        }
    }
    path = "./img/characters";
    document.getElementById("0").src = path + characters[duckPlayer1];
    document.getElementById("1").src = path + characters[duckPlayer1];
    document.getElementById("DuckP2Connect").src = path + characters[duckPlayer2];
    document.getElementById("DuckP1Connect").src = path + characters[duckPlayer1];

    path = "./img/charactersflipped";
    document.getElementById("2").src = path + characters[duckPlayer2];
}


//#endregion
//#region *** scoreSelection function ***

const scoreSelection = function(Number) {
    switch (Number) {
        case 1:
            gameScore--;
            if (gameScore == -1) gameScore = 3;
            break; //player 1 left
        case 2:
            gameScore++;
            if (gameScore == 4) gameScore = 0;
            break; //player 1 right  
    }
    switch (gameScore) {
        case 0:
            document.getElementById("gameModeScore").innerHTML = "Solo";
            document.getElementById("gameTitleScore").innerHTML = "Doelwit Verquakelen";
            loadscores("solo-doelwit-verquackelen", "t")
            break;
        case 1:
            document.getElementById("gameModeScore").innerHTML = "Solo";
            document.getElementById("gameTitleScore").innerHTML = "Ver Vliegen";
            loadscores("solo-ver-vliegen", "s")
            break;
        case 2:
            document.getElementById("gameModeScore").innerHTML = "Versus";
            document.getElementById("gameTitleScore").innerHTML = "Ver Vliegen";
            loadscores("versus-ver-vliegen", "s")
            break;
        case 3:
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

const loadscoresposition = function(gamemodeid, sortvalue, checkscoreboardEntryId) {
    var request = new XMLHttpRequest()

    request.open('GET', 'https://angry-ducks-api.azurewebsites.net/api/scoreboard/' + gamemodeid, true)
    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            if (sortvalue == "s") {
                data.sort(function(a, b) {
                    return parseFloat(a.score) + parseFloat(b.score);
                });
                for (let i = 0; i < data.length; i++) {
                    const e = data[i];
                    if (e != null) {
                        if (e.scoreboardEntryId == checkscoreboardEntryId) {
                            if (i == 0) {
                                document.querySelector(".js-VictoryScreen-positie").innerHTML = "NIEUWE HIGH SCORE!";
                            } else {
                                document.querySelector(".js-VictoryScreen-positie").innerHTML = "positie " + (i + 1);
                            }
                        }
                    }
                }
            } else if (sortvalue == "t") {
                data.sort(function(a, b) {
                    return parseFloat(a.time) - parseFloat(b.time);
                });
                //console.log(data)
                for (let i = 0; i < data.length; i++) {
                    const e = data[i];
                    if (e != null) {
                        if (i == 0) {
                            document.querySelector(".js-VictoryScreen-positie").innerHTML = "NIEUWE HIGH SCORE!";
                        } else {
                            document.querySelector(".js-VictoryScreen-positie").innerHTML = "positie " + (i + 1);
                        }
                    }
                }
                //console.log(data)
            }
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
                document.getElementById("gameDescription").innerHTML = "Speel tegen elkaar en probeer zo snel mogelijk het doelwit van de tegenstander te vernietigen.";
                break;
            case 3:
                document.getElementById("gameMode").innerHTML = "Versus";
                document.getElementById("gameTitle").innerHTML = "Ver Vliegen";
                document.getElementById("gameDescription").innerHTML = "Probeer verder te vliegen dan je tegenstander.";
                break;
            case 4:
                document.getElementById("gameMode").innerHTML = "Co-op";
                document.getElementById("gameTitle").innerHTML = "Doelwit Verquakelen";
                document.getElementById("gameDescription").innerHTML = "Vernietig het doelwit in de kortste tijd samen met je teamgenoot.";
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
                document.getElementById("gameDescription").innerHTML = "Vernietig het doelwit in de kortste tijd.";

                break;
            case 1:
                document.getElementById("gameMode").innerHTML = "Solo";
                document.getElementById("gameTitle").innerHTML = "Ver Vliegen";
                document.getElementById("gameDescription").innerHTML = "Probeer zo ver mogelijk te schieten met je eendje.";
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
            document.querySelector(".c-live-heart-rates").classList.add("game--blur");
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
    document.querySelector(".c-live-heart-rates").classList.remove("game--blur");
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
    document.querySelector(".c-live-heart-rates").classList.remove("game--blur");
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
    //console.log('Hey lekker beest');
    //console.log(ShowReconnectionScreen);
    if (ShowReconnectionScreen == true) rusthartslag();
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
    //console.log('Hey lekker beest');
    if (ShowReconnectionScreen == true) rusthartslag2();
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
    if (bluetoothConnected2 == true && player2enable == true) {
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
    document.querySelector(".c-live-heart-rates").classList.add("game--blur");
    document.body.classList.add("bgGamemode--blur"); //victory screen unhiden

}

//#endregion
//#region *** heartrate color ***
const updateHeartRateColor = function() {
    if(gamePicture != 1 && gamePicture != 3){
            switch ((HR - CalmHR) / 5) {
                case 6.0:
                case 6.1:
                case 6.2:
                case 7.5:
                case 7.6:
                case 7.7: //oranje
                    document.querySelector(".js-liveHeartRateP1").style.fill = "#F88F3E";
                    document.querySelector(".js-GMheartrateP1").style.color = "#F88F3E";
                    break;
                case 6.3:
                case 6.4:
                case 7.2:
                case 7.3:
                case 7.4: //geel
                    document.querySelector(".js-liveHeartRateP1").style.fill = "#EEFF00";
                    document.querySelector(".js-GMheartrateP1").style.color = "#EEFF00";
                    break;
                case 6.5:
                case 6.6:
                case 6.7:
                case 6.8:
                case 6.9:
                case 7.0:
                case 7.1: //groen
                    document.querySelector(".js-liveHeartRateP1").style.fill = "#00FF00";
                    document.querySelector(".js-GMheartrateP1").style.color = "#00FF00";
                    break;
                default: //rood
                    document.querySelector(".js-liveHeartRateP1").style.fill = "#EE1C25";
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
                    document.querySelector(".js-liveHeartRateP2").style.fill = "#F88F3E";
                    document.querySelector(".js-GMheartrateP2").style.color = "#F88F3E";
                    break;
                case 6.3:
                case 6.4:
                case 7.2:
                case 7.3:
                case 7.4: //geel
                    document.querySelector(".js-liveHeartRateP2").style.fill = "#EEFF00";
                    document.querySelector(".js-GMheartrateP2").style.color = "#EEFF00";
                    break;
                case 6.5:
                case 6.6:
                case 6.7:
                case 6.8:
                case 6.9:
                case 7.0:
                case 7.1: //groen
                    document.querySelector(".js-liveHeartRateP2").style.fill = "#00FF00";
                    document.querySelector(".js-GMheartrateP2").style.color = "#00FF00";
                    break;
                default: //rood
                    document.querySelector(".js-liveHeartRateP2").style.fill = "#EE1C25";
                    document.querySelector(".js-GMheartrateP2").style.color = "#EE1C25";
                    break;
            }
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
                loadGamemode5();
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

//#region *** load correct game***
const PostLeaderboardEntry = function(name, gamemodename, score, time) {
        var Url = 'https://angry-ducks-api.azurewebsites.net/api/gamemode/' + gamemodename;
        switch (gamemodename) {
            case "coop-doelwit-verquackelen":
            case "solo-doelwit-verquackelen":
                var sortvalue = "t";
                break;
            case "coop-ver-vliegen":
            case "solo-ver-vliegen":
                var sortvalue = "s";
                break;
            default:
                var sortvalue = "f";
                break;
        }
        $.get(Url, function(data, status) {
            console.log(`${data}`);
            var gamemodeId = data;

            Url = 'https://angry-ducks-api.azurewebsites.net/api/scoreboard';
            var data = {
                "Name": name,
                "GamemodeId": gamemodeId,
                "Score": score,
                "Time": time
            }

            data = JSON.stringify(data)
            $.post(Url, data, function(data, status) {
                console.log(`${data} and status is ${status}`);
                //data = JSON.parse(data);
                //console.log(data.scoreboardEntryId);
                loadscoresposition(gamemodeId, sortvalue, data.scoreboardEntryId);
            })
        })
    }
    //#endregion
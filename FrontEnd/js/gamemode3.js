//#region *** variablen ***

var loadAlldetection, score1, rounds = 3,
    winner, loser, highscore1 = 0,
    highscore2 = 0;

//#endregion


//#region *** loadgame function (components aanmaken voor canvas) ***
const loadGamemode3 = function() {
    //alle componenten aanmaken
    path = "./img/characters";
    duckP1 = new component("duck", (viewport * 0.045), (viewport * 0.045), path + characters[duckPlayer1], (viewport * 0.07), (viewportHeight * 0.425), "image");
    lblScore = new component("score", "30px", "Roboto", "black", (viewport * 0.1), (viewport * 0.060), "text");
    lblScore2 = new component("score", "30px", "Roboto", "black", viewport - (viewport * 0.1) - 300, (viewport * 0.060), "text");
    duckHitbox = new component("duckhitbox", 1, 1, "black", (viewport * 0.0925), (viewportHeight * 0.515)); //hitbox en duck zijn 2 componenten maar alle movement is 2 keer
    duckHitbox2 = new component("duckhitbox", 1, 1, "black", (viewport * 0.0925), (viewportHeight * 0.515));
    mybackground = new component("bg", viewport, (viewportHeight), links[1], 0, 0, "image");
    //lblDeltaHR = new component("HR", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.085), "text");
    lblCountdownTimer = new component("score", "300px", "Roboto", "orange", (viewport * 0.45), (viewport * 0.3), "text");
    duckP2 = new component("duck", (viewport * 0.045), (viewport * 0.045), path + characters[duckPlayer2], (viewport * 0.01), (viewportHeight * 0.6), "image");
    //lblDeltaHR2 = new component("HR", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.115), "text");
    // for (let index = 0; index < 10; index++) {
    //     distancedetection.push(new component("target", 1, 1, "red", (viewport * 0.382) + (index * (viewport * 0.064453125)), (viewportHeight * 0.999) - (viewportHeight * 0.05)));

    // }
    frames = 0; //aantal frames op 0 zetten
    secondsPast = 0; //tijd in seconden op 0 zetten
    score = 0; //max score
    score1 = 0;
    highscore1 = 0;
    highscore2 = 0;
    countdownTimer = 3; //countdown van 3seconden
    loadAlldetection = false;
    player2plays = false;
    duckP1.amounthitbottom = 0;
    duckP2.amounthitbottom = 0;
    rounds = 3;
    VarGravity = 0.14;
    VarSpeedy = -1;
    if(player2enable == false){
        duckP2.amounthitbottom = 0;
    }
    myGameArea.load(3); //laad de canvas in
}

//#endregion

//#region *** update game function (wat er gebeurt elke frame/ 50frames per seconde) ***
const updateGameArea3 = function() {

    //score controleren op einde spel
    if (rounds == 0) {
        if (player2enable == false) {
            if (duckP1.amounthitbottom >= 2) {
                timerOn = false; //timer stoppen
                myGameArea.stop(); //freeze de game
                //console.log(spname.value + " solo-ver-vliegen " + highscore1);
                PostLeaderboardEntry(spname.value, "solo-ver-vliegen", Math.round(highscore1), 0);
            }
        } else {
            if (duckP2.amounthitbottom >= 2) {
                timerOn = false; //timer stoppen
                duckP2.amounthitbottom = 2;
                myGameArea.stop();
                if (highscore1 > highscore2) {
                    winner = mpname.value;
                    loser = p2name.value;
                    PostLeaderboardEntry(mpname.value, "versus-ver-vliegen", Math.round(highscore1), 0);
                } else if (highscore1 < highscore2) {
                    winner = p2name.value;
                    loser = mpname.value;
                    PostLeaderboardEntry(p2name.value, "versus-ver-vliegen", Math.round(highscore2), 0);
                }
                var victoryScreenMessages = [`${winner} wou je niet zo hard inmaken, kop op ${loser}!`,
                    `${winner} verkwaakte ${loser}!`,
                    `${winner} versloeg ${loser}!`,
                    `${winner} vloog het verst!`,
                    `${winner} vloog verder dan ${loser}!`,
                    `twee 🦆 vochten, ${loser} werd verkwakeld door ${winner}`
                ];
                var randomNum = Math.floor(Math.random() * Math.floor(victoryScreenMessages.length));
                if (highscore1 != highscore2)
                    document.querySelector(".js-VictoryScreen-Time").innerHTML = victoryScreenMessages[randomNum];
                else {
                    document.querySelector(".js-VictoryScreen-Time").innerHTML = "Jullie vlogen gelijk!";
                    //console.log(mpname.value + " versus-ver-vliegen " + highscore1);
                    PostLeaderboardEntry(mpname.value, "versus-ver-vliegen", Math.round(highscore1), 0);
                    PostLeaderboardEntry(p2name.value, "versus-ver-vliegen", Math.round(highscore2), 0);
                }
            }
        }
    }



    //console.log(`yeeet ${player2plays} .. ${duckP1.amounthitbottom}`);

    //console.log(`${duckP1.amounthitbottom} ..... ${duckP2.amounthitbottom}`);
    //console.log(`player2 ${player2plays}`);

    if (duckP1.amounthitbottom >= 2 && player2plays == false) {
        player2plays = true;
        reload(duckP2, duckHitbox2);
        MQTTSendReload("2");
        canShoot2 = true;
    }


    //tijd aanpassen
    if (showPauseMenu == false) {
        frames += 1; //aantal frames berekenen
        if (frames == 50) { //game doet 50 frames per seconde
            //aantal seconden berekenen
            frames = 0;
            if (countdownTimer > 0) countdownTimer--;
            else {
                start(); //Common actions functie
                secondsPast++; //seconds past +1

                checkBTconnection();
            }
        }
    }


    score = Math.round(((((duckHitbox.x / viewport) - 0.0925) - (0.29 - 0.064453125)) * 15.5151515151).toFixed(1)  * 100);
    if (score < 0) { score = 0 }
    score1 = Math.round(((((duckHitbox2.x / viewport) - 0.0925) - (0.29 - 0.064453125)) * 15.5151515151).toFixed(1) * 100);
    if (score1 < 0) { score1 = 0 }


    if (player2plays == false) {
        if (myGameArea.keys && myGameArea.keys[38]) { shoot(1) }
    }
    if (player2enable == true && player2plays == true) {
        if (myGameArea.keys && myGameArea.keys[40]) { shoot(0) }
    }


    myGameArea.clear(); //canvas clearen voor nieuwe frame

    duckHitbox.newPos(); //nieuwe positie van duck instellen
    duckP1.newPos(); //nieuwe positie van duck instellen
    if (player2enable == true) {
        duckP2.newPos();
        duckHitbox2.newPos();
        //lblDeltaHR2.text = "Δ heart beat 2: " + (HR2 - CalmHR2);
    }

    //lblDeltaHR.text = "Δ heart beat: " + (HR - CalmHR);
    lblScore.text = "Score: " + (score); //text aanpassen van score
    lblScore2.text = "Score: " + (score1);
    if (countdownTimer != 0) //toont timer vanaf wanneer je kan schieten
        lblCountdownTimer.text = countdownTimer;
    else lblCountdownTimer.text = "";

    //deze orde bepaalt de stacking order: meer naar onder komt het voorandere componenten te staan
    //alles updaten: terug visueel maken na clearen
    duckHitbox.update();
    duckHitbox2.update();
    mybackground.update();
    duckP1.update();

    if (player2enable == true) {
        duckP2.update();
        //lblDeltaHR2.update();
        lblScore2.update();
    }

    lblScore.update();
    lblCountdownTimer.update();
    //lblDeltaHR.update();


    if (player2enable == false) {
        if (duckP1.amounthitbottom >= 2) { //alst ie gebounced heeft
            rounds--;
            checkIfHighScore(1, score);
            if (rounds <= 0) {
                document.querySelector(".js-VictoryScreen").style.visibility = "visible";
                document.body.classList.add("bgGamemode--blur"); //victory screen unhiden
                document.querySelector(".c-live-heart-rates").classList.add("game--blur");
                CanvasBlur = true;
                document.querySelector(".js-pause").style.display = "none"; //pause knop weg doen
                document.querySelector(".js-VictoryScreen-Time").innerHTML = `je score was: ${Math.round(highscore1)}`;
            } else {
                reload(duckP1, duckHitbox);
                MQTTSendReload("1");
                canShoot = true;
            }
        }
    } else {
        if (duckP2.amounthitbottom >= 2) { //alst ie gebounced heeft
            rounds--;
            checkIfHighScore(1, score);
            checkIfHighScore(2, score1);
            player2plays = false;
            if (rounds <= 0) {
                document.querySelector(".js-VictoryScreen").style.visibility = "visible";
                document.body.classList.add("bgGamemode--blur"); //victory screen unhiden
                document.querySelector(".c-live-heart-rates").classList.add("game--blur");
                CanvasBlur = true;
                document.querySelector(".js-pause").style.display = "none";
                document.querySelector(".js-VictoryScreen-spelers").innerHTML = `${(mpname.value)}: ${(Math.round(highscore1))}m / ${(p2name.value)}: ${(Math.round(highscore2))}m`;
            } else {
                reload(duckP1, duckHitbox, duckP2);
                MQTTSendReload("1");
                canShoot = true;
            }
        }
    }

    //victory screen hidden houden
    if (showPauseMenu == true) {
        //opens or closes pause menu
        document.querySelector(".js-PauseMenu").style.visibility = "visible";
    } else document.querySelector(".js-PauseMenu").style.visibility = "hidden";

}
const checkIfHighScore = function(player, score) {
    console.log(highscore1);
    if (player == 1) {
        if (highscore1 == 0) highscore1 = score;
        else if (highscore1 < score) highscore1 = score;
        console.log(highscore1);
    } else if (player == 2) {
        if (highscore2 == 0) highscore2 = score;
        else if (highscore2 < score) highscore2 = score;
    }
}

//#endregion
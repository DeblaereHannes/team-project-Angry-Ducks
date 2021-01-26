
var target2, target2Detection, target2Detection2, target2Detection3, target2Detection4 , target2Detection5, duckHitbox2, checkScore2, canShoot2 = false, lblScore2, winner ="", loser = "", VarNeg;

//#region *** loadgame function (components aanmaken voor canvas) ***
const loadGamemode5 = function() {
    //alle componenten aanmaken
    path = "./img/characters";
    duckP1 = new component("duck", (viewport * 0.045), (viewport * 0.045),  path + characters[duckPlayer1], (viewport * 0.07), (viewportHeight * 0.425), "image");
    lblScore = new component("score", "30px", "Roboto", "black", (viewport * 0.1), (viewport * 0.060), "text");
    lblScore2 = new component("score", "30px", "Roboto", "black", viewport - (viewport * 0.1) - 300, (viewport * 0.060), "text");
    duckHitbox = new component("duckhitbox", 1, 1, "black", (viewport * 0.0925), (viewportHeight * 0.515)); //hitbox en duck zijn 2 componenten maar alle movement is 2 keer
    duckHitbox2 = new component("duckhitbox", 1, 1, "black", viewport - (viewport * 0.0925), (viewportHeight * 0.515));
    mybackground = new component("bg", viewport, (viewportHeight), links[3], 0, 0, "image");
    //lblDeltaHR = new component("HR", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.085), "text");
    lblCountdownTimer = new component("score", "300px", "Roboto", "orange", (viewport * 0.45), (viewport * 0.3), "text");
    path = "./img/charactersflipped";
    duckP2 = new component("duck", (viewport * 0.045), (viewport * 0.045), path + characters[duckPlayer2], viewport - (viewport * 0.115), (viewportHeight * 0.425), "image");
    //lblDeltaHR2 = new component("HR", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.115), "text");
    target = new component("target", (viewport * 0.146484375), (viewport * 0.048828125), links[2], (viewport * 0.5859375), (viewportHeight * 0.95) - (viewportHeight * 0.05), "image");
    targetDetection = new component("target", (viewport * 0.048828125), 1, "yellow", (viewport * 0.634765625), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    targetDetection2 = new component("target", (viewport * 0.0244140625), 1, "green", (viewport * 0.6103515625), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    targetDetection3 = new component("target", (viewport * 0.0244140625), 1, "green", (viewport * 0.68359375), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    targetDetection4 = new component("target", (viewport * 0.0244140625), 1, "yellow", (viewport * 0.5859375), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    targetDetection5 = new component("target", (viewport * 0.0244140625), 1, "yellow", (viewport * 0.7080078125), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    target2 = new component("target", (viewport * 0.146484375), (viewport * 0.048828125), links[2], viewport - (viewport * 0.5859375) - (viewport * 0.146484375), (viewportHeight * 0.95) - (viewportHeight * 0.05), "image");
    target2Detection = new component("target", (viewport * 0.048828125), 1, "yellow", viewport - (viewport * 0.634765625) - (viewport * 0.048828125), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    target2Detection2 = new component("target", (viewport * 0.0244140625), 1, "green",viewport - (viewport * 0.6103515625) - (viewport * 0.0244140625), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    target2Detection3 = new component("target", (viewport * 0.0244140625), 1, "green", viewport - (viewport * 0.68359375) - (viewport * 0.0244140625), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    target2Detection4 = new component("target", (viewport * 0.0244140625), 1, "yellow", viewport - (viewport * 0.5859375) - (viewport * 0.0244140625), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    target2Detection5 = new component("target", (viewport * 0.0244140625), 1, "yellow", viewport - (viewport * 0.7080078125) - (viewport * 0.0244140625), (viewportHeight * 0.999) - (viewportHeight * 0.05));

    progressbarHealth = new component("progressbar", (300), (viewport * 0.017578125), "red", (viewport * 0.1), (viewport * 0.025390625));
    progressbarBackground = new component("progressbar", (300), (viewport * 0.01953125), "white", (viewport * 0.1), (viewport * 0.0244140625));
    progressbarHealth2 = new component("progressbar", (300), (viewport * 0.017578125), "red", viewport - (viewport * 0.1) - 300, (viewport * 0.025390625));
    progressbarBackground2 = new component("progressbar", (300), (viewport * 0.01953125), "white", viewport - (viewport * 0.1) - 300, (viewport * 0.0244140625));
    // for (let index = 0; index < 10; index++) {
    //     distancedetection.push(new component("target", 1, 1, "red", (viewport * 0.382) + (index * (viewport * 0.064453125)), (viewportHeight * 0.999) - (viewportHeight * 0.05)));
        
    // }
    frames = 0;         //aantal frames op 0 zetten
    secondsPast = 0;    //tijd in seconden op 0 zetten
    score = 300;          //max score
    score1 = 300;
    countdownTimer = 3; //countdown van 3seconden
    loadAlldetection = false;
    VarGravity = 0.075;
    VarSpeedy = -3;
    VarNeg = true;
    myGameArea.load(5);  //laad de canvas in
}

//#endregion

//#region *** update game function (wat er gebeurt elke frame/ 50frames per seconde) ***
const updateGameArea5 = function() {

    //score controleren op einde spel
    if(score == 0 || score1 == 0){
            timerOn = false;                //timer stoppen
            // console.log(duckHitbox.x);
            // console.log(duckHitbox.y);
            progressbarHealth.width = 0; 
            progressbarHealth2.width = 0;
            canShoot2 = false;
            VarNeg = false;
            myGameArea.stop();              //freeze de game
    }

    //checken of de hitbox de targetDetection raakt
    if (duckHitbox.crashWith(targetDetection4) || duckHitbox.crashWith(targetDetection5)) { //buitenste ring 25 punten
        if (checkScore == score) {
            score -= 25;
            progressbarHealth.width -= 25;
        }

        }
        if (duckHitbox.crashWith(targetDetection2) || duckHitbox.crashWith(targetDetection3)) { //middelste ring 50 punten
        if (checkScore == score) {
            score -= 50;
            progressbarHealth.width -= 50;
        }

        }
        if (duckHitbox.crashWith(targetDetection)) { //middelpunt 100 punten
        if (checkScore == score) {
            score -= 100;
            progressbarHealth.width -= 100;
        }
    }

    //checken of de hitbox de targetDetection raakt
    if (duckHitbox2.crashWith(target2Detection4) || duckHitbox2.crashWith(target2Detection5)) { //buitenste ring 25 punten
        if (checkScore2 == score1) {
            score1 -= 25;
            progressbarHealth2.width -= 25;
        }

        }
        if (duckHitbox2.crashWith(target2Detection2) || duckHitbox2.crashWith(target2Detection3)) { //middelste ring 50 punten
        if (checkScore2 == score1) {
            score1 -= 50;
            progressbarHealth2.width -= 50;
        }

        }
        if (duckHitbox2.crashWith(target2Detection)) { //middelpunt 100 punten
        if (checkScore2 == score1) {
            score1 -= 100;
            progressbarHealth2.width -= 100;
        }
    }


    //tijd aanpassen
    if (showPauseMenu == false) {
        frames += 1;            //aantal frames berekenen
        if (frames == 50) {     //game doet 50 frames per seconde
            //aantal seconden berekenen
            frames = 0;
            if(countdownTimer > 0) countdownTimer--;
            else{
                start();        //Common actions functie
                if (secondsPast == 0 && showPauseMenu == false && ShowReconnectionScreen == false) { //timer kan niet aan worden gelegd als die al aan staat (vermijd meermaals schieten)
                    canShoot2 = true;
                    MQTTSendReload(2);
                }
                secondsPast++;  //seconds past +1

                checkBTconnection();
            }
        }
    }


    if (myGameArea.keys && myGameArea.keys[38]) {shoot(1)}
    if (myGameArea.keys && myGameArea.keys[40]) {shoot(0)}


    //console.log(`1. ${canShoot}    2. ${canShoot2}`);

    if(duckP1.amounthitbottom >= 2){
        reload(duckP1, duckHitbox);
        MQTTSendReload("1");
        canShoot = true;
    }
    if(duckP2.amounthitbottom >= 2){
        reload(duckP2, duckHitbox2);
        duckP2.x = viewport - (viewport * 0.115);
        duckHitbox2.x = viewport - (viewport * 0.0925);
        MQTTSendReload("2");
        canShoot2 = true;
    }
   

    myGameArea.clear();     //canvas clearen voor nieuwe frame

    duckHitbox.newPos();    //nieuwe positie van duck instellen
    duckHitbox2.newPos();
    duckP1.newPos();          //nieuwe positie van duck instellen
    duckP2.newPos();
    //lblDeltaHR2.text = "Δ heart beat 2: " + (HR2 - CalmHR2);

    //lblDeltaHR.text = "Δ heart beat: " + (HR - CalmHR);
    lblScore.text = "Score: " + (score);              //text aanpassen van score
    lblScore2.text = "Score: " + (score1);  
    if(countdownTimer != 0)                         //toont timer vanaf wanneer je kan schieten
        lblCountdownTimer.text = countdownTimer;
    else lblCountdownTimer.text = "";

    //deze orde bepaalt de stacking order: meer naar onder komt het voorandere componenten te staan
    //alles updaten: terug visueel maken na clearen
    duckHitbox.update();
    duckHitbox2.update();
    mybackground.update();


    targetDetection.update();
    targetDetection2.update();
    targetDetection3.update();
    targetDetection4.update();
    targetDetection5.update();

    target2Detection.update();
    target2Detection2.update();
    target2Detection3.update();
    target2Detection4.update();
    target2Detection5.update();
    
    target.update();
    target2.update();
    
    duckP1.update();

    duckP2.update();
    //lblDeltaHR2.update();
    
    progressbarBackground.update();
    progressbarHealth.update();
    progressbarBackground2.update();
    progressbarHealth2.update();

    lblScore.update();
    lblScore2.update();
    lblCountdownTimer.update();
    //lblDeltaHR.update();

    if (score <= 0 || score1 <= 0){
        document.querySelector(".js-VictoryScreen").style.visibility = "visible"; 
        document.querySelector(".c-live-heart-rates").classList.add("game--blur");
        document.querySelector(".js-VictoryScreen-spelers").innerHTML = spname.value;
        document.body.classList.add("bgGamemode--blur");      //victory screen unhiden
        document.getElementById("js-score").classList.add("ishidden");
        CanvasBlur = true;
        document.querySelector(".js-pause").style.display = "none";                     //pause knop weg doen
        document.querySelector(".js-VictoryScreen-spelers").innerHTML = `2 spelers`;
        if (score <= 0){
            winner = mpname.value;
            loser = p2name.value;
        } 
        else if(score1 <= 0) 
        {
            winner = p2name.value;
            loser = mpname.value;
        }
        var victoryScreenMessages = [`${winner} wou je niet zo hard inmaken, kop op ${loser}!`, 
                                    `${winner} verkwaakte ${loser}!`,
                                    `${winner} versloeg ${loser}!`,
                                    `${winner} vloog het snelst!`,
                                    `${winner} vloog sneller dan ${loser}!`,
                                `twee 🦆 vochten, ${loser} werd verkwakeld door ${winner}`];
                            var randomNum = Math.floor(Math.random() * Math.floor(victoryScreenMessages.length));
                            document.querySelector(".js-VictoryScreen-spelers").innerHTML = victoryScreenMessages[randomNum];
    }
    //victory screen hidden houden
    if(showPauseMenu == true)
    {
        //opens or closes pause menu
        document.querySelector(".js-PauseMenu").style.visibility = "visible";
    }
    else document.querySelector(".js-PauseMenu").style.visibility = "hidden";

}

//#endregion

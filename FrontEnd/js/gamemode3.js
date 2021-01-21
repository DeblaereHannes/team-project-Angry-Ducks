//#region *** variablen ***

var distancedetection = [], loadAlldetection, score1;

//#endregion


//#region *** loadgame function (components aanmaken voor canvas) ***
const loadGamemode3 = function() {
    //alle componenten aanmaken
    duckP1 = new component("duck", (viewport * 0.045), (viewport * 0.045), characters[duckPlayer1], (viewport * 0.07), (viewportHeight * 0.425), "image");
    lblScore = new component("score", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.055), "text");
    duckHitbox = new component("duckhitbox", 1, 1, "black", (viewport * 0.0925), (viewportHeight * 0.515)); //hitbox en duck zijn 2 componenten maar alle movement is 2 keer
    mybackground = new component("bg", viewport, (viewportHeight), links[1], 0, 0, "image");
    lblDeltaHR = new component("HR", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.085), "text");
    lblCountdownTimer = new component("score", "300px", "Roboto", "orange", (viewport * 0.45), (viewport * 0.3), "text");
    if(player2enable == true){
        duckP2 = new component("duck", (viewport * 0.045), (viewport * 0.045), characters[duckPlayer2], (viewport * 0.01), (viewportHeight * 0.6), "image");
        lblDeltaHR2 = new component("HR", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.115), "text");
    };
    // for (let index = 0; index < 10; index++) {
    //     distancedetection.push(new component("target", 1, 1, "red", (viewport * 0.382) + (index * (viewport * 0.064453125)), (viewportHeight * 0.999) - (viewportHeight * 0.05)));
        
    // }
    frames = 0;         //aantal frames op 0 zetten
    secondsPast = 0;    //tijd in seconden op 0 zetten
    score = "unknown";          //max score
    countdownTimer = 3; //countdown van 3seconden
    loadAlldetection = false;
    player2plays == false;
    myGameArea.load(3);  //laad de canvas in
}

//#endregion

//#region *** update game function (wat er gebeurt elke frame/ 50frames per seconde) ***
const updateGameArea3 = function() {

    //score controleren op einde spel
    if(player2enable == false){
        if (duckP1.amounthitbottom >= 2) {
            timerOn = false;                //timer stoppen
            console.log(duckHitbox.x);
            console.log(duckHitbox.y);
            myGameArea.stop();              //freeze de game
        }
    }else{
        if (duckP2.amounthitbottom >= 2){
            timerOn = false;                //timer stoppen
            console.log(duckHitbox.x);
            console.log(duckHitbox.y);
            myGameArea.stop();  
        }
    }

    if(duckP1.amounthitbottom >= 2 && player2plays == false){
        score1 = score;
        player2plays = true;
        canShoot = true;
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
                secondsPast++;  //seconds past +1

                checkBTconnection();
            }
        }
    }
    

    score = ((((duckHitbox.x / viewport) - 0.0925) - (0.29 - 0.064453125)) * 15.5151515151).toFixed(1);
    if (score < 0) {score = 0}


    if (myGameArea.keys && myGameArea.keys[38]) {shoot(3)}
    if(player2enable == true){
        if (myGameArea.keys && myGameArea.keys[40]) {shoot(4)}
    }
   

    myGameArea.clear();     //canvas clearen voor nieuwe frame

    duckHitbox.newPos();    //nieuwe positie van duck instellen
    duckP1.newPos();          //nieuwe positie van duck instellen
    if(player2enable == true){
        duckP2.newPos();
        lblDeltaHR2.text = "Δ heart beat 2: " + (HR2 - CalmHR2);
    }

    lblDeltaHR.text = "Δ heart beat: " + (HR - CalmHR);
    lblScore.text = "Score: " + (score + score1);              //text aanpassen van score
    if(countdownTimer != 0)                         //toont timer vanaf wanneer je kan schieten
        lblCountdownTimer.text = countdownTimer;
    else lblCountdownTimer.text = "";

    //deze orde bepaalt de stacking order: meer naar onder komt het voorandere componenten te staan
    //alles updaten: terug visueel maken na clearen
    mybackground.update();
    duckHitbox.update();
    duckP1.update();

    if(player2enable == true){
        duckP2.update();
        lblDeltaHR2.update();
    }
    
    lblScore.update();
    lblCountdownTimer.update();
    lblDeltaHR.update();


    if(player2enable != true){
        if (duckP1.amounthitbottom >= 2){
            document.querySelector(".js-VictoryScreen").style.visibility = "visible"; 
            document.body.classList.add("bgGamemode--blur");      //victory screen unhiden
            CanvasBlur = true;
            document.querySelector(".js-pause").style.display = "none";                     //pause knop weg doen
            document.querySelector(".js-VictoryScreen-Time").innerHTML = `je score was: ${score}`;
        }
    }else{
        if(duckP2.amounthitbottom >= 2){
            document.querySelector(".js-VictoryScreen").style.visibility = "visible"; 
            document.body.classList.add("bgGamemode--blur");      //victory screen unhiden
            CanvasBlur = true;
            document.querySelector(".js-pause").style.display = "none";    
            document.querySelector(".js-VictoryScreen-spelers").innerHTML = `2 spelers`;
            document.querySelector(".js-VictoryScreen-Time").innerHTML = `jullie score was: ${score1 + score}`;
        }else{
            if(showPauseMenu != true){
                document.body.classList.remove("bgGamemode--blur");
                document.querySelector(".js-VictoryScreen").style.visibility = "hidden";
            }
        }
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

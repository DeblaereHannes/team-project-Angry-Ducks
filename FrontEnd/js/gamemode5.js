
var target2, target2Detection, target2Detection2, target2Detection3, target2Detection4 , target2Detection5, duckHitbox2;

//#region *** loadgame function (components aanmaken voor canvas) ***
const loadGamemode5 = function() {
    //alle componenten aanmaken
    duckP1 = new component("duck", (viewport * 0.045), (viewport * 0.045), characters[duckPlayer1], (viewport * 0.07), (viewportHeight * 0.425), "image");
    lblScore = new component("score", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.055), "text");
    duckHitbox = new component("duckhitbox", 1, 1, "black", (viewport * 0.0925), (viewportHeight * 0.515)); //hitbox en duck zijn 2 componenten maar alle movement is 2 keer
    duckHitbox2 = new component("duckhitbox", 1, 1, "black", viewport - (viewport * 0.0925), (viewportHeight * 0.515));
    mybackground = new component("bg", viewport, (viewportHeight), links[3], 0, 0, "image");
    lblDeltaHR = new component("HR", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.085), "text");
    lblCountdownTimer = new component("score", "300px", "Roboto", "orange", (viewport * 0.45), (viewport * 0.3), "text");
    duckP2 = new component("duck2", (viewport * 0.045), (viewport * 0.045), characters[duckPlayer2], viewport - (viewport * 0.115), (viewportHeight * 0.425), "image");
    lblDeltaHR2 = new component("HR", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.115), "text");
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
    // for (let index = 0; index < 10; index++) {
    //     distancedetection.push(new component("target", 1, 1, "red", (viewport * 0.382) + (index * (viewport * 0.064453125)), (viewportHeight * 0.999) - (viewportHeight * 0.05)));
        
    // }
    frames = 0;         //aantal frames op 0 zetten
    secondsPast = 0;    //tijd in seconden op 0 zetten
    score = 300;          //max score
    score1 = 300;
    countdownTimer = 3; //countdown van 3seconden
    loadAlldetection = false;
    myGameArea.load(5);  //laad de canvas in
}

//#endregion

//#region *** update game function (wat er gebeurt elke frame/ 50frames per seconde) ***
const updateGameArea5 = function() {

    //score controleren op einde spel
    if(score == 0 || score1 == 0){
            timerOn = false;                //timer stoppen
            console.log(duckHitbox.x);
            console.log(duckHitbox.y);
            myGameArea.stop();              //freeze de game
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


    if (myGameArea.keys && myGameArea.keys[38]) {console.log("upsy"); shoot(5)}
    if (myGameArea.keys && myGameArea.keys[40]) {console.log("downsy"); shoot(6)}


    if(duckP1.amounthitbottom >= 2){
        reload(duckP1, duckHitbox);
    }
    if(duckP2.amounthitbottom >= 2){
        reload(duckP2, duckHitbox2);
    }
   

    myGameArea.clear();     //canvas clearen voor nieuwe frame

    duckHitbox.newPos();    //nieuwe positie van duck instellen
    duckP1.newPos();          //nieuwe positie van duck instellen
    duckP2.newPos();
    lblDeltaHR2.text = "Δ heart beat 2: " + (HR2 - CalmHR2);

    lblDeltaHR.text = "Δ heart beat: " + (HR - CalmHR);
    lblScore.text = "Score: " + (score + score1);              //text aanpassen van score
    if(countdownTimer != 0)                         //toont timer vanaf wanneer je kan schieten
        lblCountdownTimer.text = countdownTimer;
    else lblCountdownTimer.text = "";

    //deze orde bepaalt de stacking order: meer naar onder komt het voorandere componenten te staan
    //alles updaten: terug visueel maken na clearen
    mybackground.update();
    duckHitbox.update();

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
    duckHitbox2.update();
    lblDeltaHR2.update();
    
    lblScore.update();
    lblCountdownTimer.update();
    lblDeltaHR.update();

    
    //victory screen hidden houden
    if(showPauseMenu == true)
    {
        //opens or closes pause menu
        document.querySelector(".js-PauseMenu").style.visibility = "visible";
    }
    else document.querySelector(".js-PauseMenu").style.visibility = "hidden";

}

//#endregion

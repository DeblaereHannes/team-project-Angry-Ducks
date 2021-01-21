//#region *** variablen definieren ***

var duckP1, duckP2, duckHitbox, target, targetDetection, targetDetection2, targetDetection3, targetDetection4, targetDetection5, progressbarBackground, progressbarHealth;
var lblScore, score, checkScore, timerOn, lblSecondsPast, frames, secondsPast = 0, countdownTimer, lblCountdownTimer, checkSecondsPast = 0, previousTimestampHR = 0, previousTimestampHR2 = 0, lblDeltaHR, lblDeltaHR2;
var viewport = document.documentElement.clientWidth, viewportHeight = document.documentElement.clientHeight;
//img ophalen
var links = ["link1", "link2", "link3"]
for(link of links)
{
    link = document.createElement('link');
}
links[0] = "./img/gamemodes/gamemode1.png";
links[1] = "./img/gamemodes/gamemode3.png";
links[2] = "target.png";
//tijd standaard uit
timerOn = false;

//#endregion

//#region *** loadgame function (components aanmaken voor canvas) ***
const loadGame = function() {
    //alle componenten aanmaken
    duckP1 = new component("duck", (viewport * 0.045), (viewport * 0.045), characters[duckPlayer1], (viewport * 0.07), (viewportHeight * 0.425), "image");
    lblScore = new component("score", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.055), "text");
    lblSecondsPast = new component("timer", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.025), "text");
    target = new component("target", (viewport * 0.146484375), (viewport * 0.048828125), links[2], (viewport * 0.5859375), (viewportHeight * 0.95) - (viewportHeight * 0.05), "image");
    targetDetection = new component("target", (viewport * 0.048828125), 1, "yellow", (viewport * 0.634765625), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    targetDetection2 = new component("target", (viewport * 0.0244140625), 1, "green", (viewport * 0.6103515625), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    targetDetection3 = new component("target", (viewport * 0.0244140625), 1, "green", (viewport * 0.68359375), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    targetDetection4 = new component("target", (viewport * 0.0244140625), 1, "yellow", (viewport * 0.5859375), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    targetDetection5 = new component("target", (viewport * 0.0244140625), 1, "yellow", (viewport * 0.7080078125), (viewportHeight * 0.999) - (viewportHeight * 0.05));
    progressbarHealth = new component("progressbar", (500), (viewport * 0.017578125), "red", (viewport * 0.09765625), (viewport * 0.025390625));
    progressbarBackground = new component("progressbar", (500), (viewport * 0.01953125), "white", (viewport * 0.09765625), (viewport * 0.0244140625));
    duckHitbox = new component("duckhitbox", 1, 1, "black", (viewport * 0.0925), (viewportHeight * 0.515)); //hitbox en duck zijn 2 componenten maar alle movement is 2 keer
    lblCountdownTimer = new component("score", "300px", "Roboto", "orange", (viewport * 0.45), (viewport * 0.3), "text");
    mybackground = new component("bg", viewport, (viewportHeight), links[0], 0,0 , "image");
    lblDeltaHR = new component("HR", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.085), "text");
    lblDeltaHR2 = new component("HR", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.115), "text");

    if(player2enable == true){
        duckP2 = new component("duck", (viewport * 0.045), (viewport * 0.045), characters[duckPlayer2], (viewport * 0.01), (viewportHeight * 0.6), "image");
    }

    frames = 0;         //aantal frames op 0 zetten
    secondsPast = 0;    //tijd in seconden op 0 zetten
    score = 500;        //max score
    countdownTimer = 3; //countdown van 3seconden
    myGameArea.load(1);  //laad de canvas in
}

//#endregion

//#region *** update game function (wat er gebeurt elke frame/ 50frames per seconde) ***
const updateGameArea = function() {

    //score controleren op einde spel
    if (score <= 0) {
        timerOn = false;                //timer stoppen
        score = 0;                      //score op 0 anders krijg je -....
        progressbarHealth.width = 0;    //de breedte van rode bar op 0 anders krijg je -....
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
    

    //tijd aanpassen
    if (showPauseMenu == false && ShowReconnectionScreen == false) {
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

    //console.log(`${previousTimestampHR} .. ${timeStampHR}`);
   
    if(secondsPast - checkSecondsPast > 7 && canShoot == false){    //auto reload 7sec na shoot
        reload();   //Common actions functie
    }

    if (myGameArea.keys && myGameArea.keys[38]) {shoot(1)}
    if(player2enable == true){
        if (myGameArea.keys && myGameArea.keys[40]) {shoot(2)}
    }

    myGameArea.clear();     //canvas clearen voor nieuwe frame

    duckHitbox.newPos();    //nieuwe positie van duck instellen
    duckP1.newPos();          //nieuwe positie van duck instellen
    if(player2enable == true){
        duckP2.newPos();
        lblDeltaHR2.text = "Δ heart beat 2: " + (HR2 - CalmHR2);
    }

    lblDeltaHR.text = "Δ heart beat: " + (HR - CalmHR);
    lblSecondsPast.text = "Tijd: " + secondsPast;   //text aanpassen van tijd
    lblScore.text = "Score: " + score;              //text aanpassen van score
    if(countdownTimer != 0)                         //toont timer vanaf wanneer je kan schieten
        lblCountdownTimer.text = countdownTimer;
    else lblCountdownTimer.text = "";

    //deze orde bepaalt de stacking order: meer naar onder komt het voorandere componenten te staan
    //alles updaten: terug visueel maken na clearen

    duckHitbox.update();
    targetDetection.update();
    targetDetection2.update();
    targetDetection3.update();
    targetDetection4.update();
    targetDetection5.update();
    mybackground.update();
    target.update();
    
    duckP1.update();
    if(player2enable == true){
        duckP2.update();
        lblDeltaHR2.update();
    }

    lblScore.update();
    lblSecondsPast.update();
    progressbarBackground.update();
    progressbarHealth.update();
    lblCountdownTimer.update();
    lblDeltaHR.update();

    if (score <= 0){
        document.querySelector(".js-VictoryScreen").style.visibility = "visible"; 
        document.body.classList.add("bgGamemode--blur");      //victory screen unhiden
        CanvasBlur = true;
        document.querySelector(".js-pause").style.display = "none";                     //pause knop weg doen
        if (player2enable == true){
            document.querySelector(".js-VictoryScreen-spelers").innerHTML = `2 spelers`;
            document.querySelector(".js-VictoryScreen-Time").innerHTML = `jullie tijd was: ${secondsPast} seconden`;
        }else{
            document.querySelector(".js-VictoryScreen-Time").innerHTML = `je tijd was: ${secondsPast} seconden`;
        }
    }
    else if(showPauseMenu != true){
        document.body.classList.remove("bgGamemode--blur");
        document.querySelector(".js-VictoryScreen").style.visibility = "hidden";
    }    //victory screen hidden houden
    if(showPauseMenu == true)
    {
        //opens or closes pause menu
        document.querySelector(".js-PauseMenu").style.visibility = "visible";
    }
    else document.querySelector(".js-PauseMenu").style.visibility = "hidden";

}

//#endregion

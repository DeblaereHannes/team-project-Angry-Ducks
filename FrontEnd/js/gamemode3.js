//#region *** loadgame function (components aanmaken voor canvas) ***
const loadGamemode3 = function() {
    //alle componenten aanmaken
    duckP1 = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), characters[duckPlayer1], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
    lblScore = new component("score", "30px", "Roboto", "black", (viewport * 0.78125), (viewport * 0.078125), "text");
    duckHitbox = new component("duckhitbox", 1, 1, "black", (viewport * 0.09765625), (viewport * 0.238)); //hitbox en duck zijn 2 componenten maar alle movement is 2 keer
    lblCountdownTimer = new component("score", "300px", "Roboto", "orange", (viewport * 0.45), (viewport * 0.3), "text");
    frames = 0;         //aantal frames op 0 zetten
    secondsPast = 0;    //tijd in seconden op 0 zetten
    score = 0;        //max score
    countdownTimer = 3; //countdown van 3seconden
    myGameArea.load();  //laad de canvas in
}

//#endregion

//#region *** update game function (wat er gebeurt elke frame/ 50frames per seconde) ***
const updateGameArea = function() {

    //score controleren op einde spel
    if (score == -1) {
        timerOn = false;                //timer stoppen
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

    //console.log(`${previousTimestampHR} .. ${timeStampHR}`);
   
    if(secondsPast - checkSecondsPast > 7 && canShoot == false){    //auto reload 7sec na shoot
        reload();   //Common actions functie
    }

    myGameArea.clear();     //canvas clearen voor nieuwe frame

    duckHitbox.newPos();    //nieuwe positie van duck instellen
    duckP1.newPos();          //nieuwe positie van duck instellen

    lblSecondsPast.text = "Tijd: " + secondsPast;   //text aanpassen van tijd
    lblScore.text = "Score: " + score;              //text aanpassen van score
    if(countdownTimer != 0)                         //toont timer vanaf wanneer je kan schieten
        lblCountdownTimer.text = countdownTimer;
    else lblCountdownTimer.text = "";

    //deze orde bepaalt de stacking order: meer naar onder komt het voorandere componenten te staan
    //alles updaten: terug visueel maken na clearen
    duckHitbox.update();
    duckP1.update();
    lblScore.update();
    lblSecondsPast.update();
    lblCountdownTimer.update();

    if (score == -1){
        document.querySelector(".js-VictoryScreen").style.visibility = "visible"; 
        document.body.classList.add("bgGamemode--blur");      //victory screen unhiden
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

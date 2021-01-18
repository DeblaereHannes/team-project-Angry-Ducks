//#region *** variablen definieren ***

var duck, duckHitbox, target, targetDetection, targetDetection2, targetDetection3, targetDetection4, targetDetection5, progressbarBackground, progressbarHealth;
var lblScore, score, checkScore, timerOn, lblSecondsPast, frames, secondsPast = 0, countdownTimer, lblCountdownTimer, checkSecondsPast = 0, previousTimestampHR = 0;
var viewport = document.documentElement.clientWidth;
//img ophalen
var links = ["link1", "link2", "link3"]
for(link of links)
{
    link = document.createElement('link');
}
links[0] = "./img/characters/Duck_Male3.png";
links[1] = "bg.png";
links[2] = "target.png";
//tijd standaard uit
timerOn = false;

//#endregion

//#region *** loadgame function (components aanmaken voor canvas) ***
const loadGame = function() {
    //alle componenten aanmaken
    duck = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), characters[duckPlayer1], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
    lblScore = new component("score", "30px", "Consolas", "black", (viewport * 0.78125), (viewport * 0.078125), "text");
    lblSecondsPast = new component("timer", "30px", "30px", "black", (viewport * 0.78125), (viewport * 0.0390625), "text");
    target = new component("target", (viewport * 0.146484375), (viewport * 0.048828125), links[2], (viewport * 0.5859375), (viewport * 0.400390625), "image");
    targetDetection = new component("target", (viewport * 0.048828125), 1, "red", (viewport * 0.634765625), (viewport * 0.4241));
    targetDetection2 = new component("target", (viewport * 0.0244140625), 1, "white", (viewport * 0.6103515625), (viewport * 0.4241));
    targetDetection3 = new component("target", (viewport * 0.0244140625), 1, "white", (viewport * 0.68359375), (viewport * 0.4241));
    targetDetection4 = new component("target", (viewport * 0.0244140625), 1, "red", (viewport * 0.5859375), (viewport * 0.4241));
    targetDetection5 = new component("target", (viewport * 0.0244140625), 1, "red", (viewport * 0.7080078125), (viewport * 0.4241));
    progressbarHealth = new component("progressbar", (500), (viewport * 0.017578125), "red", (viewport * 0.09765625), (viewport * 0.025390625));
    progressbarBackground = new component("progressbar", (500), (viewport * 0.01953125), "white", (viewport * 0.09765625), (viewport * 0.0244140625));
    duckHitbox = new component("duckhitbox", 1, 1, "black", (viewport * 0.09765625), (viewport * 0.238)); //hitbox en duck zijn 2 componenten maar alle movement is 2 keer
    lblCountdownTimer = new component("score", "300px", "Consolas", "orange", (viewport * 0.45), (viewport * 0.3), "text");
    frames = 0;         //aantal frames op 0 zetten
    secondsPast = 0;    //tijd in seconden op 0 zetten
    score = 500;        //max score
    countdownTimer = 3; //countdown van 3seconden
    myGameArea.load();  //laad de canvas in
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
    duck.newPos();          //nieuwe positie van duck instellen

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
    target.update();
    duck.update();
    lblScore.update();
    lblSecondsPast.update();
    progressbarBackground.update();
    progressbarHealth.update();
    lblCountdownTimer.update();

    if (score <= 0){
        document.querySelector(".js-VictoryScreen").style.visibility = "visible"; 
        document.body.classList.add("bgGamemode--blur");      //victory screen unhiden
        document.querySelector(".js-pause").style.display = "none";                     //pause knop weg doen
        document.querySelector(".js-VictoryScreen-Time").innerHTML = `je tijd was: ${secondsPast} seconden`;    //tijd op de victory screen zetten
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

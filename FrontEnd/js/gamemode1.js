//variablen definieren
var duck, duckHitbox, target, targetDetection, targetDetection2, targetDetection3, targetDetection4, targetDetection5, progressbarBackground, progressbarHealth;
var lblScore, score, checkScore, timerOn, lblSecondsPast, frames, secondsPast;
var viewport = document.documentElement.clientWidth;
//img ophalen
var links = ["link1", "link2", "link3"]
for(link of links)
{
    link = document.createElement('link');
}
links[0] = "./img/Duck_Gray.png";
links[1] = "bg.png";
links[2] = "target.png";
//tijd standaard uit
timerOn = false;

//load als pagina geladen is
const loadGame = function() {
    //alle componenten aanmaken
    CommonComponents();
    lblScore = new component("score", "30px", "Consolas", "black", (viewport * 0.78125), (viewport * 0.078125), "text");
    lblSecondsPast = new component("timer", "30px", "30px", "black", (viewport * 0.78125), (viewport * 0.0390625), "text");
    target = new component("target", (viewport * 0.146484375), (viewport * 0.048828125), links[2], (viewport * 0.5859375), (viewport * 0.400390625), "image");
    targetDetection = new component("target", (viewport * 0.048828125), 2, "red", (viewport * 0.634765625), (viewport * 0.4228515625));
    targetDetection2 = new component("target", (viewport * 0.0244140625), 2, "white", (viewport * 0.6103515625), (viewport * 0.4228515625));
    targetDetection3 = new component("target", (viewport * 0.0244140625), 2, "white", (viewport * 0.68359375), (viewport * 0.4228515625));
    targetDetection4 = new component("target", (viewport * 0.0244140625), 2, "red", (viewport * 0.5859375), (viewport * 0.4228515625));
    targetDetection5 = new component("target", (viewport * 0.0244140625), 2, "red", (viewport * 0.7080078125), (viewport * 0.4228515625));
    progressbarHealth = new component("progressbar", (viewport * 0.48828125), (viewport * 0.017578125), "red", (viewport * 0.09765625), (viewport * 0.025390625));
    progressbarBackground = new component("progressbar", (viewport * 0.48828125), (viewport * 0.01953125), "white", (viewport * 0.09765625), (viewport * 0.0244140625));
    duckHitbox = new component("duck", 1, 1, "black", (viewport * 0.09765625), (viewport * 0.2392578125)); //hitbox en duck zijn 2 componenten maar alle movement is 2 keer
    frames = 0; //aantal frames op 0 zetten
    secondsPast = 0; //tijd in seconden op 0 zetten
    score = 500;
    myGameArea.load(); //laad de canvas in
    
}
//updategame (gebeurt 50 keer per seconde)
const updateGameArea = function() {

    //score controleren op einde spel
    if (score <= 0) {
        timerOn = false;
        score = 0;
        progressbarHealth.width = 0;
        /*endOfGameMessage.text = "Gewonnen je tijd was " + secondsPast + " seconden";*/
        myGameArea.stop();
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
    if (timerOn == true && showPauseMenu == false) {
        frames += 1; //aantal frames berekenen
        if (frames == 50) { //game doet 50 frames per seconde
            secondsPast += 1; //aantal seconden berekenen
            frames = 0;
        }
    }

    myGameArea.clear(); //canvas clearen

    duckHitbox.newPos(); //nieuwe positie van duck instellen
    duck.newPos();

    lblSecondsPast.text = "Tijd: " + secondsPast; //text aanpassen van tijd en score
    lblScore.text = "Score: " + score;

    //deze orde bepaalt de stacking order: meer naar onder komt het voorandere componenten te staan
    //alles updaten: terug visueel maken na clearen
    duckHitbox.update();
    targetDetection.update();
    targetDetection2.update();
    targetDetection3.update();
    targetDetection4.update();
    targetDetection5.update();
    // myBackground.update();
    target.update();
    duck.update();
    lblScore.update();
    lblSecondsPast.update();
    progressbarBackground.update();
    progressbarHealth.update();
    

    if (score <= 0){
        document.querySelector(".js-VictoryScreen").style.visibility = "visible";
        document.querySelector(".js-pause").style.display="none";
    }
    else {document.querySelector(".js-VictoryScreen").style.visibility = "hidden";};
    if(showPauseMenu == true)
    {
        //opens or closes pause menu
        document.querySelector(".js-PauseMenu").style.visibility = "visible";
    }
    else document.querySelector(".js-PauseMenu").style.visibility = "hidden";
}

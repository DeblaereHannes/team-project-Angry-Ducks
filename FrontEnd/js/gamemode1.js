//variablen definieren
var duckHitbox, target, targetDetection, targetDetection2, targetDetection3, targetDetection4, targetDetection5, progressbarBackground, progressbarHealth;
var lblScore, score, checkScore, endOfGameMessage, timerOn, lblSecondsPast, frames, secondsPast;
var canShoot, showBackgroundBox = false;
var viewport = document.documentElement.clientWidth;
//img ophalen
var links = ["link1", "link2", "link3", "link4", "link5"]
for(link of links)
{
    link = document.createElement('link');
}
links[0] = "quak.png";
links[1] = "bg.png";
links[2] = "target.png";
links[3] = "pause.png";
links[4] = "exit.png";
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
    endOfGameMessage = new component("endOfGameMessage", "30px", "Consolas", "white", (viewport * 0.25), (viewport * 0.09765625), "text");
    duckHitbox = new component("duck", 1, 1, "black", (viewport * 0.09765625), (viewport * 0.2392578125)); //hitbox en duck zijn 2 componenten maar alle movement is 2 keer
    frames = 0; //aantal frames op 0 zetten
    secondsPast = 0; //tijd in seconden op 0 zetten
    score = 500;
    myGameArea.load(); //laad de canvas in
    
}

//buttons
const start = function() {
    //tijd aanleggen
    if (secondsPast == 0 && showBackgroundBox == false) { //timer kan niet aan worden gelegd als die al aan staat (vermijd meermaals schieten)
        timerOn = true;
        canShoot = true;
    }
}

const shoot = function() {
    //ophalen van snelheid (slider ingesteld in html: 1-6)
    if (canShoot == true && showBackgroundBox == false) {
        canShoot = false;
        if(HR != null){
            document.querySelector('.js-shootwaarde').innerHTML = `shootwaarde: ${HR}`;
            var speed = HR;
        }
        else{
            var speed = parseFloat(document.getElementById("speedx").value , 10);
        }
        
        console.log(speed);
        checkScore = score; //checkScore gelijkstellen zodat de score niet blijft -100 ofzo doen als de hitbox de detection raakt
        duck.gravity = 0.05; //zwaartekracht aanmaken zodat de eend valt
        duckHitbox.gravity = 0.05;
        duck.speedX = speed; //horizontale snelheid volgens de slider waarde
        duckHitbox.speedX = speed;
        duck.speedY = -2; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)
        duckHitbox.speedY = -2;
    }
}

const reload = function() {
    //locatie eend resetten
    if(secondsPast != 0 && showBackgroundBox == false){
        canShoot = true;
    }
    duck = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), links[0], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
    duckHitbox = new component("duck", 1, 1, "black", (viewport * 0.09765625), (viewport * 0.2392578125));


}


//updategame (gebeurt 50 keer per seconde)
const updateGameArea = function() {

    //score controleren op einde spel
    if (score <= 0) {
        timerOn = false;
        score = 0;
        progressbarHealth.width = 0;
        endOfGameMessage.text = "Gewonnen je tijd was " + secondsPast + " seconden";
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
    if (timerOn == true && showBackgroundBox == false) {
        frames += 1; //aantal frames berekenen
        if (frames == 50) { //game doet 50 frames per seconde
            secondsPast += 1; //aantal seconden berekenen
            frames = 0;
        }
    }

    myGameArea.clear(); //canvas clearen

    if (myGameArea.x && myGameArea.y) {
        if (btnPause.clicked()) {
            console.log("im clicked");
            showBackgroundBox = true; 
        }
        if (btnExit.clicked() || btnContinueBackground.clicked()) {
            showBackgroundBox = false; 
        }
        /*if (btnSettingsBackground.clicked()) {
             
        }*/
        /*if (btnMainMenuBackground.clicked()) {
             
        }*/
    }

    duckHitbox.newPos(); //nieuwe positie van duck instellen
    duck.newPos();

    lblSecondsPast.text = "Tijd: " + secondsPast; //text aanpassen van tijd en score
    lblScore.text = "Score: " + score;
    lblContinue.text = "Verdergaan";
    lblsettings.text = "Instellingen";
    lblMainMenu.text = "Hoofdmenu";

    //deze orde bepaalt de stacking order: meer naar onder komt het voorandere componenten te staan
    //alles updaten: terug visueel maken na clearen
    duckHitbox.update();
    targetDetection.update();
    targetDetection2.update();
    targetDetection3.update();
    targetDetection4.update();
    targetDetection5.update();
    myBackground.update();
    target.update();
    duck.update();
    btnPause.update();
    lblScore.update();
    lblSecondsPast.update();
    progressbarBackground.update();
    progressbarHealth.update();
    

    if (score <= 0){
        blackBox.update();
        endOfGameMessage.update();
    }

    if(showBackgroundBox == true)
    {
        //opens or closes pause menu
        backgroundBox.update();
        btnExit.update();
        btnContinueBackground.update();
        btnSettingsBackground.update();
        btnMainMenuBackground.update();
        lblContinue.update();
        lblsettings.update();
        lblMainMenu.update();
    }
}
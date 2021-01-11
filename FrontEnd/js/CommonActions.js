var canShoot;

//buttons
const start = function() {
    //tijd aanleggen
    if (secondsPast == 0 && showPauseMenu == false) { //timer kan niet aan worden gelegd als die al aan staat (vermijd meermaals schieten)
        timerOn = true;
        canShoot = true;
    }
}

const shoot = function() {
    //ophalen van snelheid (slider ingesteld in html: 1-6)
    if (canShoot == true && showPauseMenu == false) {
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
    if(secondsPast != 0 && showPauseMenu == false){
        canShoot = true;
        duck = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), links[0], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
        duckHitbox = new component("duck", 1, 1, "black", (viewport * 0.09765625), (viewport * 0.2392578125));
    }

}
const refresh = function() {
    timerOn = false;       //tijd terug uit zetten
    canShoot = false;
    myGameArea.stop();      //canvas freezen
    loadGame();             //volledige game terug aanmaken
}
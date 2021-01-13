var canShoot, CalmHR, ShootHR,duckPlayer1 = 0; duckPlayer2 = 3;
var characters = ["", "", "","", "", "","", "", ""]
for(link of characters)
{
    link = document.createElement('character');
}
characters[0] = "./img/characters/Duck_Male1.png";
characters[1] = "./img/characters/Duck_Male2.png";
characters[2] = "./img/characters/Duck_Male3.png";
characters[3] = "./img/characters/Duck_Female1.png";
characters[4] = "./img/characters/Duck_Female2.png";
characters[5] = "./img/characters/Duck_Female3.png";
characters[6] = "./img/characters/Duck_White.png";
characters[7] = "./img/characters/Duck_Yellow.png";
characters[8] = "./img/characters/Duck_Gray.png";
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
            ShootHR = (HR - CalmHR) / 5;
            document.querySelector('.js-shootwaarde').innerHTML = `shootwaarde: ${ShootHR}`;
            var speed = ShootHR;
        }
        else{
            var speed = parseFloat(document.getElementById("speedx").value , 10);
        }
        //console.log(speed);
        checkScore = score; //checkScore gelijkstellen zodat de score niet blijft -100 ofzo doen als de hitbox de detection raakt
        duck.gravity = 0.05; //zwaartekracht aanmaken zodat de eend valt
        duckHitbox.gravity = 0.05;
        duck.speedX = speed; //horizontale snelheid volgens de slider waarde
        duckHitbox.speedX = speed;
        duck.speedY = -2; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)
        duckHitbox.speedY = -2;
        checkSecondsPast = secondsPast;
    }
}

const reload = function() {
    //locatie eend resetten
    if(secondsPast != 0 && showPauseMenu == false){
        canShoot = true;
        duck = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), links[0], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
        duckHitbox = new component("duck", 1, 1, "black", (viewport * 0.09765625), (viewport * 0.238));
    }

}
const refresh = function() {
    timerOn = false;       //tijd terug uit zetten
    canShoot = false;
    document.querySelector(".js-pause").style.display="block";
    myGameArea.stop();      //canvas freezen
    loadGame();             //volledige game terug aanmaken
}

const rusthartslag = function() {
    CalmHR = HR;
    document.querySelector('.js-rusthartslag').innerHTML = `rusthartslag: ${CalmHR}`;
}
const characterSelection = function(Number){
    switch(Number)
    {
        
        case 1: duckPlayer1--; if(duckPlayer1 == duckPlayer2) duckPlayer1--; if(duckPlayer1== -1) duckPlayer1=8; break;//player 1 left
        case 2: duckPlayer1++; if(duckPlayer1 == duckPlayer2) duckPlayer1++; if(duckPlayer1 == 9) duckPlayer1=0; break;//player 1 right
        case 3: duckPlayer2--; if(duckPlayer1 == duckPlayer2) duckPlayer2--; if(duckPlayer2== -1) duckPlayer2=8; break;//player 2 left
        case 4: duckPlayer2++; if(duckPlayer1 == duckPlayer2) duckPlayer2++; if(duckPlayer2 == 9) duckPlayer2=0; break; //player 2 right
        
    }
    document.getElementById("0").src= characters[duckPlayer1];
    document.getElementById("1").src= characters[duckPlayer1];
    document.getElementById("2").src= characters[duckPlayer2];

}

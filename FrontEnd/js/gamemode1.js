//variablen definieren
var duck, duckHitbox, target, targetDetection, targetDetection2, targetDetection3, targetDetection4, targetDetection5, progressbarBackground, progressbarHealth, blackbox;
var lblScore, score, checkScore, endOfGameMessage, timerOn, lblSecondsPast, frames, secondsPast, btnPause;
var canShoot;
var viewport = document.documentElement.clientWidth;
//img ophalen
var links = ["link1", "link2", "link3", "link4"]
for(link of links)
{
    link = document.createElement('link');
}
links[0] = "quak.png";
links[1] = "bg.png";
links[2] = "target.png";
links[3] = "pause.png";
//tijd standaard uit
timerOn = false;

//load als pagina geladen is
const loadGame = function() {
    //alle componenten aanmaken
    lblScore = new component("score", "30px", "Consolas", "black", (viewport * 0.78125), (viewport * 0.078125), "text");
    lblSecondsPast = new component("timer", "30px", "30px", "black", (viewport * 0.78125), (viewport * 0.0390625), "text");
    btnPause = new component("btnPause", (viewport * 0.029296875), (viewport * 0.029296875), links[3], (viewport * 0.029296875), (viewport * 0.01953125), "image");
    target = new component("target", (viewport * 0.146484375), (viewport * 0.048828125), links[2], (viewport * 0.5859375), (viewport * 0.400390625), "image");
    targetDetection = new component("target", (viewport * 0.048828125), 2, "red", (viewport * 0.634765625), (viewport * 0.4228515625));
    targetDetection2 = new component("target", (viewport * 0.0244140625), 2, "white", (viewport * 0.6103515625), (viewport * 0.4228515625));
    targetDetection3 = new component("target", (viewport * 0.0244140625), 2, "white", (viewport * 0.68359375), (viewport * 0.4228515625));
    targetDetection4 = new component("target", (viewport * 0.0244140625), 2, "red", (viewport * 0.5859375), (viewport * 0.4228515625));
    targetDetection5 = new component("target", (viewport * 0.0244140625), 2, "red", (viewport * 0.7080078125), (viewport * 0.4228515625));
    blackbox = new component("endScreen", (viewport * 0.5), 200, "black", (viewport * 0.25), (0));
    progressbarBackground = new component("progressbar", (viewport * 0.48828125), (viewport * 0.01953125), "white", (viewport * 0.09765625), (viewport * 0.0244140625));
    progressbarHealth = new component("progressbar", (viewport * 0.48828125), (viewport * 0.017578125), "red", (viewport * 0.09765625), (viewport * 0.025390625));
    endOfGameMessage = new component("endOfGameMessage", "30px", "Consolas", "white", (viewport * 0.25), (viewport * 0.09765625), "text");
    myBackground = new component("background", viewport, (viewport * 0.4248046875), links[1], 0, 0, "image");
    duck = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), links[0], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
    duckHitbox = new component("duck", 1, 1, "black", (viewport * 0.09765625), (viewport * 0.2392578125)); //hitbox en duck zijn 2 componenten maar alle movement is 2 keer
    frames = 0; //aantal frames op 0 zetten
    secondsPast = 0; //tijd in seconden op 0 zetten
    score = 500;
    myGameArea.load(); //laad de canvas in
    
}

//buttons
const start = function() {
    //tijd aanleggen
    if (secondsPast == 0) { //timer kan niet aan worden gelegd als die al aan staat (vermijd meermaals schieten)
        timerOn = true;
        canShoot = true;
    }
}

const shoot = function() {
    //ophalen van snelheid (slider ingesteld in html: 1-6)
    if (canShoot == true) {
        canShoot = false;
        var speed = document.getElementById("speedx").value;
        console.log(parseFloat(speed, 10));
        checkScore = score; //checkScore gelijkstellen zodat de score niet blijft -100 ofzo doen als de hitbox de detection raakt
        duck.gravity = 0.05; //zwaartekracht aanmaken zodat de eend valt
        duckHitbox.gravity = 0.05;
        duck.speedX = parseFloat(speed, 10); //horizontale snelheid volgens de slider waarde
        duckHitbox.speedX = parseFloat(speed, 10);
        duck.speedY = -2; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)
        duckHitbox.speedY = -2;
    }
}

const reload = function() {
    //locatie eend resetten
    if(secondsPast != 0){
        canShoot = true;
    }
    duck = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), links[0], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
    duckHitbox = new component("duck", 1, 1, "black", (viewport * 0.09765625), (viewport * 0.2392578125));


}

/*I suppose you can remove this*/
/*function refresh() {
    timerOn = false;       //tijd terug uit zetten
    myGameArea.stop();      //canvas freezen
    loadGame();             //volledige game terug aanmaken
}*/

//gameaerea aka canvas
var myGameArea = {
    canvas: document.createElement("canvas"),
    //canvas inladen
    load: function() {
        this.canvas.width = viewport;
        this.canvas.height = (viewport * 0.4248046875);
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    //canvas clearen (alles wissen zodat je kan "hertekenen")
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    //canvas freezen
    stop: function() {
        clearInterval(this.interval);
    }
}

//component init
const component = function(name, width, height, color, x, y, type) {
    //default instellingen van component
    this.name = name;
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.text = "";
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.bounce = 0.001;
    this.amounthitbottom = 0;
    //herteken img of herschrijf text
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            if (type == "image") {
                ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width, this.height);
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    };
    //verandert de positie van het component
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    };
    //checkt of het component de onderste lijn van de gamearea/canvas raakt
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            if (this.name == "duck") {
                this.speedX = 0;
                this.speeY = 0;
            }
            this.y = rockbottom;
            if (this.amounthitbottom > 0) {
                this.gravity = 0;
            } else {
                this.gravitySpeed = -(this.gravitySpeed * this.bounce);
            }
            this.amounthitbottom += 1;
        }
    };
    //checkt of het component de positie van ander object raakt
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
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
    if (timerOn == true) {
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
    myBackground.update();
    target.update();
    duck.update();
    btnPause.update();
    lblScore.update();
    lblSecondsPast.update();
    progressbarBackground.update();
    progressbarHealth.update();
    

    if (score <= 0){
        blackbox.update();
        endOfGameMessage.update();
    }
}
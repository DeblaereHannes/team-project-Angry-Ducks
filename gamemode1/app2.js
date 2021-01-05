//variablen definieren
var duck, duckHitbox, target, targetDetection, targetDetection2, targetDetection3, targetDetection4, targetDetection5, progressbarBackground, progressbarHealth;
var lblScore, score, checkScore, endOfGameMessage, timerOn, lblSecondsPast, frames, secondsPast;
var canShoot;
//img ophalen
var link1 = document.createElement('link');
var link2 = document.createElement('link');
var link3 = document.createElement('link');
link1.href = "quak.png";
link2.href = "bg.png";
link3.href = "target.png";
//tijd standaard uit
timerOn = false;

//load als pagina geladen is
function loadGame() {
    //alle componenten aanmaken
    lblScore = new component("score", "30px", "Consolas", "black", 0, 40, "text");
    lblSecondsPast = new component("timer", "30px", "Consolas", "black", 800, 40, "text");
    target = new component("target", 150, 50, link3.href, 600, 410, "image");
    targetDetection = new component("target", 50, 2, "red", 650, 433);
    targetDetection2 = new component("target", 25, 2, "white", 625, 433);
    targetDetection3 = new component("target", 25, 2, "white", 700, 433);
    targetDetection4 = new component("target", 25, 2, "red", 600, 433);
    targetDetection5 = new component("target", 25, 2, "red", 725, 433);
    progressbarBackground = new component("progressbar", 500, 20, "white", 200, 25);
    progressbarHealth = new component("progressbar", 500, 18, "red", 200, 26);
    endOfGameMessage = new component("endOfGameMessage", "30px", "Consolas", "black", 100, 100, "text");
    myBackground = new component("background", 1024, 435, link2.href, 0, 0, "image");
    duck = new component("duck", 50, 50, link1.href, 75, 195, "image");
    duckHitbox = new component("duck", 1, 1, "black", 100, 245);          //hitbox en duck zijn 2 componenten maar alle movement is 2 keer
    frames = 0;               //aantal frames op 0 zetten
    secondsPast = 0;              //tijd in seconden op 0 zetten
    score = 500; 
    amountsended = 0; 
    myGameArea.load();      //laad de canvas in
}

//buttons
function start() {
    //tijd aanleggen
    if(secondsPast == 0){ //timer kan niet aan worden gelegd als die al aan staat (vermijd meermaals schieten)
        timerOn = true;
        canShoot = true;
    }
}

function shoot() {
    //ophalen van snelheid (slider ingesteld in html: 1-6)
    if(canShoot == true){
        canShoot = false;
        var speed = document.getElementById("speedx").value;
        console.log(parseFloat(speed, 10));
        checkScore = score;                              //checkScore gelijkstellen zodat de score niet blijft -100 ofzo doen als de hitbox de detection raakt
        duck.gravity = 0.05;                            //zwaartekracht aanmaken zodat de eend valt
        duckHitbox.gravity = 0.05;                      
        duck.speedX = parseFloat(speed, 10);            //horizontale snelheid volgens de slider waarde
        duckHitbox.speedX = parseFloat(speed, 10);
        duck.speedY = -2;                               //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)
        duckHitbox.speedY = -2;
    }
}

function reload() {
    //locatie eend resetten
    canShoot = true;
    duck = new component("duck", 50, 50, link1.href, 75, 195, "image");
    duckHitbox = new component("duck", 1, 1, "black", 100, 245);
}

/*I suppose you can remove this*/
/*function refresh() {
    timerOn = false;       //tijd terug uit zetten
    myGameArea.stop();      //canvas freezen
    loadGame();             //volledige game terug aanmaken
}*/

//gameaerea aka canvas
var myGameArea = {
    canvas : document.createElement("canvas"),
    load : function() {
        this.canvas.width = 1024;
        this.canvas.height = 435;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
      }
}

//component init
function component(name, width, height, color, x, y, type) {
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
    this.update = function(){
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
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    };
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            if (this.name == "duck"){
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
function updateGameArea() {

    //score controleren op einde spel
    if (score <= 0){
        score = 0;
        progressbarHealth.width = 0;
        endOfGameMessage.text = "Gewonnen :)";
        timerOn = false;
        myGameArea.stop();
    }

    //checken of de hitbox de targetDetection raakt
    if (duckHitbox.crashWith(targetDetection4) || duckHitbox.crashWith(targetDetection5)) {     //buitenste ring 25 punten
        if (checkScore == score){
            score -= 25;
            progressbarHealth.width -= 25;
        }
    }
    if (duckHitbox.crashWith(targetDetection2) || duckHitbox.crashWith(targetDetection3)) {     //middelste ring 50 punten
        if (checkScore == score){
            score -= 50;
            progressbarHealth.width -= 50;
        }
    }
    if (duckHitbox.crashWith(targetDetection)) {        //middelpunt 100 punten
        if (checkScore == score){
            score -= 100;
            progressbarHealth.width -= 100;
        }
    }

    //tijd aanpassen
    if (timerOn == true){
        frames += 1;              //aantal frames berekenen
        if (frames == 50){        //game doet 50 frames per seconde
            secondsPast += 1;         //aantal seconden berekenen
            frames = 0;
        }
    }
    
    myGameArea.clear();     //canvas clearen

    duckHitbox.newPos();    //nieuwe positie van duck instellen
    duck.newPos();

    lblSecondsPast.text = "tijd: " + secondsPast;    //text aanpassen van tijd en score
    lblScore.text = "SCORE: " + score;

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
    lblScore.update();
    lblSecondsPast.update();
    progressbarBackground.update();
    progressbarHealth.update();
    endOfGameMessage.update();
}
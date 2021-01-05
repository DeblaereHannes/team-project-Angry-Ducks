//variablen definieren
var duck, duckhitbox, target, targetdetection, targetdetection2, targetdetection3, targetdetection4, targetdetection5, progressbarbackside, progressbar;
var myScore, score, testscore, endText, timerAan, mytimer, time, time2;
//img ophalen
var link1 = document.createElement('link');
var link2 = document.createElement('link');
var link3 = document.createElement('link');
link1.href = "quak.png";
link2.href = "bg.png";
link3.href = "target.png";
//tijd standaard uit
timerAan = false;

//load als pagina geladen is
function loadGame() {
    //alle componenten aanmaken
    myScore = new component("score", "30px", "Consolas", "black", 0, 40, "text");
    mytimer = new component("timer", "30px", "Consolas", "black", 800, 40, "text");
    target = new component("target", 150, 50, link3.href, 600, 410, "image");
    targetdetection = new component("target", 50, 2, "red", 650, 433);
    targetdetection2 = new component("target", 25, 2, "white", 625, 433);
    targetdetection3 = new component("target", 25, 2, "white", 700, 433);
    targetdetection4 = new component("target", 25, 2, "red", 600, 433);
    targetdetection5 = new component("target", 25, 2, "red", 725, 433);
    progressbarbackside = new component("progressbar", 500, 20, "white", 200, 25);
    progressbar = new component("progressbar", 500, 18, "red", 200, 26);
    endText = new component("endText", "30px", "Consolas", "black", 100, 100, "text");
    myBackground = new component("background", 1024, 435, link2.href, 0, 0, "image");
    duck = new component("duck", 50, 50, link1.href, 75, 195, "image");
    duckhitbox = new component("duck", 1, 1, "black", 100, 245);          //hitbox en duck zijn 2 componenten maar alle movement is 2 keer
    time = 0;               //aantal frames op 0 zetten
    time2 = 0;              //tijd in seconden op 0 zetten
    score = 500; 
    amountsended = 0; 
    myGameArea.load();      //laad de canvas in
}

//buttons
function start() {
    //tijd aanleggen
    timerAan = true;
}

function sendit() {
    //ophalen van snelheid (slider ingesteld in html: 1-6)
    var speed = document.getElementById("speedx").value;
    console.log(parseFloat(speed, 10));
    testscore = score;                              //testscore gelijkstellen zodat de score niet blijft -100 ofzo doen als de hitbox de detection raakt
    duck.gravity = 0.05;                            //zwaartekracht aanmaken zodat de eend valt
    duckhitbox.gravity = 0.05;                      
    duck.speedX = parseFloat(speed, 10);            //horizontale snelheid volgens de slider waarde
    duckhitbox.speedX = parseFloat(speed, 10);
    duck.speedY = -2;                               //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)
    duckhitbox.speedY = -2;
}

function reshoot() {
    //locatie eend resetten
    duck = new component("duck", 50, 50, link1.href, 75, 195, "image");
    duckhitbox = new component("duck", 1, 1, "black", 100, 245);
}

function reload() {
    timerAan = false;       //tijd terug uit zetten
    myGameArea.stop();      //canvas freezen
    loadGame();             //volledige game terug aanmaken
}

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
        endText.text = "Gewonnen :)";
        timerAan = false;
        myGameArea.stop();
    }

    //checken of de hitbox de targetdetection raakt
    if (duckhitbox.crashWith(targetdetection4) || duckhitbox.crashWith(targetdetection5)) {     //buitenste ring 25 punten
        if (testscore == score){
            score -= 25;
            progressbar.width -= 25;
        }
    }
    if (duckhitbox.crashWith(targetdetection2) || duckhitbox.crashWith(targetdetection3)) {     //middelste ring 50 punten
        if (testscore == score){
            score -= 50;
            progressbar.width -= 50;
        }
    }
    if (duckhitbox.crashWith(targetdetection)) {        //middelpunt 100 punten
        if (testscore == score){
            score -= 100;
            progressbar.width -= 100;
        }
    }

    //tijd aanpassen
    if (timerAan == true){
        time += 1;              //aantal frames berekenen
        if (time == 50){        //game doet 50 frames per seconde
            time2 += 1;         //aantal seconden berekenen
            time = 0;
        }
    }
    
    myGameArea.clear();     //canvas clearen

    duckhitbox.newPos();    //nieuwe positie van duck instellen
    duck.newPos();

    mytimer.text = "tijd: " + time2;    //text aanpassen van tijd en score
    myScore.text = "SCORE: " + score;

    //deze orde bepaalt de stacking order: meer naar onder komt het voorandere componenten te staan
    //alles updaten: terug visueel maken na clearen
    duckhitbox.update();
    targetdetection.update();
    targetdetection2.update();
    targetdetection3.update();
    targetdetection4.update();
    targetdetection5.update();
    myBackground.update();
    target.update();
    duck.update();
    myScore.update();
    mytimer.update();
    progressbarbackside.update();
    progressbar.update();
    endText.update();
}
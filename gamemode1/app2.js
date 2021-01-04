var duck, yellowGamePiece, progressbarbackside, progressbar;
var myScore, score, testscore, endText, timerAan, mytimer, time;
var link1 = document.createElement('link');
var link2 = document.createElement('link');
var link3 = document.createElement('link');
//var link3 = document.createElement('link');
link1.href = "quak.png";
link2.href = "bg.png";
link3.href = "catapult_2.png";
timerAan = false;

//start
function loadGame() {
    myScore = new component("score", "30px", "Consolas", "black", 0, 40, "text");
    mytimer = new component("timer", "30px", "Consolas", "black", 800, 40, "text");
    yellowGamePiece = new component("target", 10, 10, "yellow", 650, 415);
    progressbarbackside = new component("progressbar", 500, 20, "white", 200, 25);
    progressbar = new component("progressbar", 500, 18, "red", 200, 26);
    endText = new component("endText", "30px", "Consolas", "black", 100, 100, "text");
    //console.log(endScore);
    myBackground = new component("background", 1024, 435, link2.href, 0, 0, "image");
    //catapult = new component("catapult", 61, 100, link3.href, 0, 0, "image");
    duck = new component("duck", 50, 50, link1.href, 75, 195, "image");
    time = 0;
    score = 500;
    amountsended = 0;
    amountsendedafter = 1;
    myGameArea.load();
}

function start() {
    timerAan = true;
}

function sendit() {
    var speed = document.getElementById("speedx").value;
    console.log(parseFloat(speed, 10));
    testscore = score;
    duck.gravity = 0.05;
    duck.speedX = parseFloat(speed, 10);
    duck.speedY = -2;
}

function reshoot() {
    duck = new component("duck", 50, 50, link1.href, 75, 195, "image");
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

//component to make
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

//updategame
function updateGameArea() {
    if (score <= 0){
        endText.text = "Gewonnen :)";
        timerAan = false;
        myGameArea.stop();
    }
    if (duck.crashWith(yellowGamePiece)) {
        if (testscore == score){
            score -= 100;
            progressbar.width -= 100;
        }
    }
    if (timerAan == true){
        time += 1;
    }
    
    myGameArea.clear();

    duck.newPos();
    mytimer.text = "tijd: " + time;
    myScore.text = "SCORE: " + score;
    myBackground.update();
    yellowGamePiece.update();
    duck.update();
    myScore.update();
    mytimer.update();
    progressbarbackside.update();
    progressbar.update();
    endText.update();
    //catapult.update();
}

//motion
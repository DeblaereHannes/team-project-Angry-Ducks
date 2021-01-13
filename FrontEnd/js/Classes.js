//#region *** variablen ***

var testhitbox = false, testduck = false, pauseXduck, pauseYduck, pauseXhitbox, pauseYhitbox;

//#endregion

//#region *** component class ***

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
        if (showPauseMenu == true){
            ctx.filter = "blur(10px)";
        }else{
            ctx.filter = "blur(0px)";
        }
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
        if(showPauseMenu == true){
            if(this.name == "duck"){
                if(testduck == false){
                    //pausegrav = this.gravity;
                    pauseXduck = this.speedX;
                    pauseYduck = this.speedY;
                    testduck = true;
                }
                this.speedX = 0;
                this.speedY = 0;
            }
            if(this.name == "duckhitbox"){
                if(testhitbox == false){
                    //pausegrav = this.gravity;
                    pauseXhitbox = this.speedX;
                    pauseYhitbox = this.speedY;
                    testhitbox = true;
                }
                this.speedX = 0;
                this.speedY = 0;
            }
            
  
        } else{

            if(this.name == "duck"){
                if(testduck == true){
                    //this.gravity = pausegrav;
                    this.speedX = pauseXduck;
                    this.speedY = pauseYduck;
                    testduck = false;
                }
            }
            if(this.name == "duckhitbox"){
                if(testhitbox == true){
                    //this.gravity = pausegrav;
                    this.speedX = pauseXhitbox;
                    this.speedY = pauseYhitbox;
                    testhitbox = false;
                }
            }
            
            console.log(`${this.name} .. ${this.speedX}`);
            this.gravitySpeed += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY + this.gravitySpeed;
        }
        this.hitBottom();
    };
    //checkt of het component de onderste lijn van de gamearea/canvas raakt
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            if (this.name == "duck" || this.name == "duckhitbox") {
                this.speedX = 0;
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
    };
    //check if clicked
    this.clicked = function() {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var clicked = true;
        if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
          clicked = false;
        }
        return clicked;
    };
}

//#endregion

//#region *** gamarea class ***

var myGameArea = {
    canvas: document.createElement("canvas"),
    //canvas inladen
    load: function() {
        //console.log(this.canvas);
        this.canvas.width = viewport;
        this.canvas.height = (viewport * 0.4248046875);
        this.context = this.canvas.getContext("2d");
        document.querySelector(".js-canvas-div").appendChild(this.canvas);
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

//#endregion

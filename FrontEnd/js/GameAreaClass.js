//gameaerea aka canvas
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
        window.addEventListener('mousedown', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
        window.addEventListener('mouseup', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })
        window.addEventListener('touchstart', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
        window.addEventListener('touchend', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })
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

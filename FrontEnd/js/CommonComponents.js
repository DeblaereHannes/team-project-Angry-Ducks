var btnPause, btnExit, myBackground, duck;

const CommonComponents = function() {
    btnPause = new component("btnPause", (viewport * 0.029296875), (viewport * 0.029296875), links[3], (viewport * 0.029296875), (viewport * 0.021484375), "image");
    btnExit = new component("btnExit", (viewport * 0.029296875), (viewport * 0.029296875), links[4], (viewport * 0.65296875), (viewport * 0.0513671875), "image");
    //myBackground = new component("background", viewport, (viewport * 0.4248046875), links[1], 0, 0, "image");
    duck = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), links[0], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
    // duckP1 = new component("duckP1", (viewport * 0.048828125), (viewport * 0.048828125), characters[duckPlayer1], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
}
var lblContinue, lblsettings, lblMainMenu, btnPause, blackBox, backgroundBox, btnExit, btnContinueBackground, btnSettingsBackground, btnMainMenuBackground, myBackground, duck;

const CommonComponents = function() {
    lblContinue = new component("btnContinue", (viewport * 0.29296875), (viewport * 0.048828125), "white", (viewport * 0.4330078125), (viewport * 0.138670625), "text");
    lblsettings = new component("btnSettings", (viewport * 0.29296875), (viewport * 0.048828125), "white", (viewport * 0.4232421875), (viewport * 0.21890625), "text");
    lblMainMenu = new component("btnMainMenu", (viewport * 0.29296875), (viewport * 0.048828125), "white", (viewport * 0.4427734375), (viewport * 0.295078125), "text");
    btnPause = new component("btnPause", (viewport * 0.029296875), (viewport * 0.029296875), links[3], (viewport * 0.029296875), (viewport * 0.021484375), "image");
    blackBox = new component("endScreen", (viewport * 0.5), 200, "black", (viewport * 0.25), (0));
    backgroundBox = new component("backgroundBox", (viewport * 0.40), (viewport * 0.35), "White", (viewport * 0.30), (viewport * 0.035));
    btnExit = new component("btnExit", (viewport * 0.029296875), (viewport * 0.029296875), links[4], (viewport * 0.65296875), (viewport * 0.0513671875), "image");
    btnContinueBackground = new component("btnContinue", (viewport * 0.29296875), (viewport * 0.048828125), "orange", (viewport * 0.35), (viewport * 0.107421875), "");
    btnSettingsBackground = new component("btnSettings", (viewport * 0.29296875), (viewport * 0.048828125), "orange", (viewport * 0.35), (viewport * 0.18765625), "");
    btnMainMenuBackground = new component("btnMainMenu", (viewport * 0.29296875), (viewport * 0.048828125), "orange", (viewport * 0.35), (viewport * 0.26578125), "");
    myBackground = new component("background", viewport, (viewport * 0.4248046875), links[1], 0, 0, "image");
    duck = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), links[0], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
}
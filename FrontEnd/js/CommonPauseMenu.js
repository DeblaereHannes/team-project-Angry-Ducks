var showPauseMenu = false, btnPause,btnExit;

const listenToButtons = function(){
    btnExit.addEventListener("click", function(){
        console.log("Exit Clicked");
        hidePauseMenu();
    });
    btnPause.addEventListener("click", function(){
        console.log("Pause Clicked");
        showPauseMenu = true; 
    });
}

const init = function() {
    btnPause = document.querySelector(".js-pause");
    btnExit = document.querySelector(".js-exit");
    listenToButtons();
}
const hidePauseMenu = function(){
    showPauseMenu = false; 
}

document.addEventListener("DOMContentLoaded", init);

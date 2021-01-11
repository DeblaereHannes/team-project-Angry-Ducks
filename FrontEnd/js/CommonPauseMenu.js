var showPauseMenu = false, btnPause,btnExit;

const listenToButtons = function(){
    btnExit.addEventListener("click", function(){
        console.log("Exit Clicked");
        hidePauseMenu();
    });
    btnPause.addEventListener("click", function(){
        console.log("Pause Clicked");
        showPauseMenu = true;
        document.querySelector(".bgGamemode").classList.add("bgGamemode--blur");
    });
}

const init = function() {
    btnPause = document.querySelector(".js-pause");
    btnExit = document.querySelector(".js-exit");
    listenToButtons();
}
const hidePauseMenu = function(){
    showPauseMenu = false; 
    document.querySelector(".bgGamemode").classList.remove("bgGamemode--blur");
}

document.addEventListener("DOMContentLoaded", init);
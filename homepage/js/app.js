let startButton;
let homepage, loadingpage;

const listenToButtons = function(){
    startButton.addEventListener("click", function(){
        //homepage.classList.remove("current");
        //loadingpage.classList.add("current");
        window.location.href = "gamemode1.html";
    });
}


const init = function() {
    startButton = document.querySelector(".js-play");
    homepage = document.querySelector(".js-homepage");
    loadingpage = document.querySelector(".js-loadpage");

    listenToButtons();
 }
 
 document.addEventListener("DOMContentLoaded", init);
let startButton;
let homepage, background, backtohome, playerselection, players;

// fade intro screen
const showIntro = function(){
    $(".js-howest").animate({
        opacity: 1,
    }, 400);
    setTimeout(function(){
        $(".js-howest").animate({
            opacity: 0,
          }, 400);
        
    }, 3400);
    setTimeout(function(){ document.querySelector(".js-howest").classList.add("ishidden") }, 3850);

    setTimeout(function(){
        $(".js-sport").animate({
            opacity: 1,
          }, 400);
        
    }, 4000);
    setTimeout(function(){
        $(".js-sport").animate({
            opacity: 0,
          }, 400);
        
    }, 7400);
    setTimeout(function(){ document.querySelector(".js-sport").classList.add("ishidden") }, 8150);
    setTimeout(function(){
        $(".js-logo").animate({
            opacity: 1,
          }, 400);
    }, 8000);
    setTimeout(function(){
        $(".js-logo").animate({
            opacity: 0,
          }, 400);
    }, 11400);
    setTimeout(function(){
        document.querySelector(".js-logo").classList.add("ishidden");
        document.querySelector(".js-intro").classList.remove("current");
        homepage.classList.add("current");
        background.classList.add("current");
    }, 11850);

    setTimeout(function(){
        $(".js-homepage").animate({
            opacity: 1,
          }, 400);
          $(".js-background").animate({
            opacity: 1,
          }, 400);
    }, 12000);
}


const listenToButtons = function(){
    startButton.addEventListener("click", function(){
        homepage.classList.remove("current");
        playerselection.classList.add("current");
        background.classList.add("homescreen--blur");
    });

    backtohome.addEventListener("click", function(){
        playerselection.classList.remove("current");
        homepage.classList.add("current");
        background.classList.remove("homescreen--blur");
    })

    for(let player of players){
        player.addEventListener("click", function(){
            for(let remove of players){
                remove.classList.remove("player--selected");
            }

            player.classList.add("player--selected");

            if(player.innerHTML == "1 speler"){

                document.querySelector(".js-2spelers").classList.add("ishidden");
                document.querySelector(".js-1speler").classList.remove("ishidden");
            }
            if(player.innerHTML == "2 spelers"){
                document.querySelector(".js-1speler").classList.add("ishidden");
                document.querySelector(".js-2spelers").classList.remove("ishidden");
            }
        })
    }
}


const init = function() {
    startButton = document.querySelector(".js-play");
    homepage = document.querySelector(".js-homepage");
    background = document.querySelector(".js-background");
    playerselection = document.querySelector(".js-playerselection");
    backtohome = document.querySelector(".js-backtohome");
    players = document.querySelectorAll(".js-player");

    setTimeout(function(){ showIntro(); }, 2000);
    listenToButtons();
 }
 
 document.addEventListener("DOMContentLoaded", init);
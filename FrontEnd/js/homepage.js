let startButton;
let homepage, background, backtohome, backtoplayerselection, playerselection, gameselection, players, togamemodeselect, connectionWindow, BTConnectionP1, BTConnectionP2;
let spname, mpname, p2name, spelen, tohomescreen, toconnectionscreen;

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
        if(ShowReconnectionScreen == false){
            spname.value = "";
            mpname.value = "";
            p2name.value = "";
            playerselection.classList.remove("current");
            homepage.classList.add("current");
            background.classList.remove("homescreen--blur");
        }
    })

    backtoplayerselection.addEventListener("click", function(){
        gameselection.classList.remove("current");
        playerselection.classList.add("current");
    })

    spelen.addEventListener("click", function(){
        document.querySelector(".js-gameselection").style.display = "none";
        background.classList.remove("current");
        document.querySelector(".js-gamemode1").classList.add("current");
        CanvasBlur = false;
        switch(gamePicture){
            case 0:
                player2enable = false;
                loadGame();
                break;
            case 1:
                player2enable = false;
                loadGamemode3();
                break;
            case 2:
                player2enable = true
                loadGame();
            case 3:
                player2enable = true;
                loadGame();
            case 4:
                player2enable = true;
                loadGame();
                break;
            default: 
                loadGame();
                break;
        }
    })

    connectionWindow.addEventListener("click", function(){
        console.log("click");
        //namen uitlezen
        if(connectionWindow.classList.contains("ellendig_lange_naam_om_te_zeggen_dat_er_maar_1_speler_speelt")){
                document.querySelector(".js-player1nameconnection").innerHTML = spname.value;
        }
        else{
                document.querySelector(".js-player1nameconnection").innerHTML = mpname.value;
                document.querySelector(".js-player2nameconnection").innerHTML = p2name.value;
        }
        ShowReconnectionWindow();
        background.classList.add("homescreen--blur");
    });
    BTConnectionP1.addEventListener("click", function(){
        if(isHeart1Red == true)//hartje rood
            rusthartslag();
        else BTconnection();

    });
    BTConnectionP2.addEventListener("click", function(){
        if(isHeart2Red == true)//hartje rood
            rusthartslag2();
        else BTconnection2();
    });

    for(let player of players){
        player.addEventListener("click", function(){
            document.querySelector(".js-player1nameconnection").innerHTML = "";
            document.querySelector(".js-player2nameconnection").innerHTML = "";
            if(ShowReconnectionScreen == false){
                for(let remove of players){
                    remove.classList.remove("player--selected");
                }

                player.classList.add("player--selected");

                if(player.innerHTML == "1 speler"){
                    gamePicture = 0;
                    //gameSelection(1);
                    spname.value = mpname.value;
                    p2name.value = "";
                    document.querySelector(".js-liveheartbeatP2").classList.add("ishidden");
                    document.querySelector(".js-2spelers").classList.add("ishidden");
                    document.querySelector(".js-heartbeatP2").classList.add("ishidden");
                    document.querySelector(".js-1speler").classList.remove("ishidden");
                    connectionWindow.classList.add("ellendig_lange_naam_om_te_zeggen_dat_er_maar_1_speler_speelt");
                }
                if(player.innerHTML == "2 spelers"){
                    gamePicture = 1;
                    //gameSelection(1);
                    mpname.value = spname.value;
                    document.querySelector(".js-liveheartbeatP2").classList.remove("ishidden");
                    document.querySelector(".js-1speler").classList.add("ishidden");
                    document.querySelector(".js-heartbeatP2").classList.remove("ishidden");
                    document.querySelector(".js-2spelers").classList.remove("ishidden");
                    if(duckPlayer1 == duckPlayer2){
                        duckPlayer2++;
                        duckPlayer2 = duckPlayer2%9;
                        document.getElementById("2").src= characters[duckPlayer2];
                    };

                    connectionWindow.classList.remove("ellendig_lange_naam_om_te_zeggen_dat_er_maar_1_speler_speelt");
                }
            }
        })
        togamemodeselect.addEventListener("click", function()
            {
                if(ShowReconnectionScreen == false){
                    if((document.querySelector(".js-1speler").classList.contains("ishidden"))) //2 spelers
                        {
                            if(document.querySelector(".js-heartrateP1").innerHTML > 0 && document.querySelector(".js-heartrateP2").innerHTML > 0)
                            {
                                
                                    playerselection.classList.remove("current");
                                    gameselection.classList.add("current");
                                    gameselection.style.display = "block";
                                    gameSelection(2);
                    
                                    let showmodesforplayer;
                                    for(let player of players){
                                        if (player.classList.contains("player--selected")) showmodesforplayer = player.innerHTML;
                                    }
                                
                            }
                        }
                    else{
                        if(document.querySelector(".js-heartrateP1").innerHTML > 0)
                        {
                            playerselection.classList.remove("current");
                            gameselection.classList.add("current");
                            gameselection.style.display = "block";
                            gameSelection(2);
            
                            let showmodesforplayer;
                            for(let player of players){
                                if (player.classList.contains("player--selected")) showmodesforplayer = player.innerHTML;
                            }  
                        }
                    }
                }
            })
        }

        backtoplayerselection.addEventListener("click", function(){
            gameselection.style.display = "none";
            gameselection.classList.remove("current");
            playerselection.classList.add("current");
        })

        for(let btnhome of tohomescreen){
            btnhome.addEventListener("click", function(){
                refresh(1);
                showPauseMenu = false;
                document.body.style.backgroundImage = "";
                document.querySelector(".js-gamemode1").classList.remove("current");
                gameselection.style.display = "block";
                background.classList.add("current");
            })
        }
    }


const init = function() {
    console.log(viewport);
    console.log(viewportHeight);
    startButton = document.querySelector(".js-play");
    homepage = document.querySelector(".js-homepage");
    background = document.querySelector(".js-background");
    playerselection = document.querySelector(".js-playerselection");
    backtohome = document.querySelector(".js-backtohome");
    backtoplayerselection = document.querySelector(".js-backtoplayerselection");
    players = document.querySelectorAll(".js-player");
    togamemodeselect = document.querySelector(".js-togamemodeselect");
    gameselection = document.querySelector(".js-gameselection");
    spname = document.querySelector(".js-spName");
    mpname = document.querySelector(".js-mpName");
    p2name = document.querySelector(".js-player2name");
    spelen = document.querySelector(".js-togame");
    connectionWindow = document.querySelector(".js-ShowConnectionWindow");
    BTConnectionP1 = document.querySelector(".js-BTConnectionP1");
    BTConnectionP2 = document.querySelector(".js-BTConnectionP2");
    tohomescreen = document.querySelectorAll(".js-tohomemenu");

    setTimeout(function(){ showIntro(); }, 2000);
    listenToButtons();
 }
 
 document.addEventListener("DOMContentLoaded", init);

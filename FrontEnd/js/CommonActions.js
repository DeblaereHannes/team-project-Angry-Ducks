//#region ***  Variablen ***

let chosenHeartRateService = null;
var HR, HR2, player2enable = false, player2plays = false;
var showPauseMenu = false, ShowReconnectionScreen = false, btnPause,btnExits, bluetoothConnected = false, bluetoothConnected2 = false, timeStampHR2;
var canShoot, CalmHR, CalmHR2, ShootHR,duckPlayer1 = 0, duckPlayer2 = 3, gamePicture = 1, canAlert = true, hearts, isHeart1Red = false, isHeart2Red = false;
var characters = ["", "", "","", "", "","", "", ""], gameSelections = ["", "", "", ""];
for(link of characters)
{
    link = document.createElement('character');
}
characters[0] = "./img/characters/Duck_Male1.png";
characters[1] = "./img/characters/Duck_Male2.png";
characters[2] = "./img/characters/Duck_Male3.png";
characters[3] = "./img/characters/Duck_Female1.png";
characters[4] = "./img/characters/Duck_Female2.png";
characters[5] = "./img/characters/Duck_Female3.png";
characters[6] = "./img/characters/Duck_White.png";
characters[7] = "./img/characters/Duck_Yellow.png";
characters[8] = "./img/characters/Duck_Gray.png";

for(link of gameSelections)
{
    link = document.createElement('gameSelection');
}
gameSelections[0] = "./img/gameselection/imgGamemode1.png";
gameSelections[1] = "./img/gameselection/imgGamemode2.png";
gameSelections[2] = "./img/gameselection/imgGamemode3.png";
gameSelections[3] = "./img/gameselection/imgGamemode4.png";
gameSelections[4] = "./img/gameselection/imgGamemode5.png";

//#endregion

//#region *** Start Function ***

const start = function() {
    //tijd aanleggen
    if (secondsPast == 0 && showPauseMenu == false && ShowReconnectionScreen == false) { //timer kan niet aan worden gelegd als die al aan staat (vermijd meermaals schieten)
        timerOn = true;
        canShoot = true;
    }
}

//#endregion

//#region *** Shoot Function ***

const shoot = function(wichbutton) {
    //ophalen van snelheid (slider ingesteld in html: 1-6)
    if (canShoot == true && showPauseMenu == false && ShowReconnectionScreen == false) {
      //console.log(speed);
      checkScore = score; //checkScore gelijkstellen zodat de score niet blijft -100 ofzo doen als de hitbox de detection raakt

      if(player2plays == true && wichbutton == 2 && player2enable == true){

        if(HR2 != null){
          ShootHR = (HR2 - CalmHR2) / 5;
          document.querySelector('.js-shootwaarde').innerHTML = `shootwaarde: ${ShootHR}`;
          var speed = ShootHR;
        }else{
          console.error("no HR");
        }
        canShoot = false;
        duckP2.gravity = 0.075; //zwaartekracht aanmaken zodat de eend valt
        duckP2.speedX = speed; //horizontale snelheid volgens de slider waarde
        duckP2.speedY = -3; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)

        duckHitbox.gravity = 0.075;
        duckHitbox.speedX = speed;
        duckHitbox.speedY = -3;
        checkSecondsPast = secondsPast;
      }else{
        if(player2plays == false && wichbutton == 1 && player2enable == true){
          if(HR != null){
            ShootHR = (HR - CalmHR) / 5;
            document.querySelector('.js-shootwaarde').innerHTML = `shootwaarde: ${ShootHR}`;
            var speed = ShootHR;
          }else{
            console.error("no HR");
          }
          canShoot = false;
          duckP1.gravity = 0.075; //zwaartekracht aanmaken zodat de eend valt
          duckP1.speedX = speed; //horizontale snelheid volgens de slider waarde
          duckP1.speedY = -3; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)

          duckHitbox.gravity = 0.075;
          duckHitbox.speedX = speed;
          duckHitbox.speedY = -3;
          checkSecondsPast = secondsPast;
        }else{
          if(player2enable == false && wichbutton == 1){
            if(HR != null){
              ShootHR = (HR - CalmHR) / 5;
              document.querySelector('.js-shootwaarde').innerHTML = `shootwaarde: ${ShootHR}`;
              var speed = ShootHR;
            }else{
              console.error("no HR");
            }
            canShoot = false;
            duckP1.gravity = 0.075; //zwaartekracht aanmaken zodat de eend valt
            duckP1.speedX = speed; //horizontale snelheid volgens de slider waarde
            duckP1.speedY = -3; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)

            duckHitbox.gravity = 0.075;
            duckHitbox.speedX = speed;
            duckHitbox.speedY = -3;
            checkSecondsPast = secondsPast;
          }
        }
      }
  }
}

//#endregion

//#region *** Reload 2 duck Function ***

const reload = function() {
    //locatie eend resetten
    if(secondsPast != 0 && showPauseMenu == false ShowReconnectionScreen == false){
      if(player2enable == true){
        player2plays = !player2plays;
        if(player2plays == true){
          duckP2.x = (viewport * 0.0732421875);
          duckP2.y = (viewport * 0.1904296875);
          duckP2.speedY = 0;
          duckP2.gravitySpeed = 0;
          duckP2.gravity = 0;
          duckP2.amounthitbottom = 0;
          duckHitbox.x = (viewport * 0.09765625);
          duckHitbox.y = (viewport * 0.238);
          duckHitbox.speedY = 0;
          duckHitbox.gravitySpeed = 0;
          duckHitbox.gravity = 0;
          duckP1.x = (viewport * 0.01)
          duckP1.y = (viewport * 1)
          duckP1.speedY = 0;
          duckP1.gravitySpeed = 0;
          duckP1.gravity = 0;
        }else{
          duckP1.x = (viewport * 0.0732421875);
          duckP1.y = (viewport * 0.1904296875);
          duckP1.speedY = 0;
          duckP1.gravitySpeed = 0;
          duckP1.gravity = 0;
          duckP1.amounthitbottom = 0;
          duckHitbox.x = (viewport * 0.09765625);
          duckHitbox.y = (viewport * 0.238);
          duckHitbox.speedY = 0;
          duckHitbox.gravitySpeed = 0;
          duckHitbox.gravity = 0;
          duckP2.x = (viewport * 0.01)
          duckP2.y = (viewport * 1)
          duckP2.speedY = 0;
          duckP2.gravitySpeed = 0;
          duckP2.gravity = 0;
        }


      } else{
        duckP1.x = (viewport * 0.0732421875);
        duckP1.y = (viewport * 0.1904296875);
        duckP1.speedY = 0;
        duckP1.gravitySpeed = 0;
        duckP1.amounthitbottom = 0;
        duckHitbox.x = (viewport * 0.09765625);
        duckHitbox.y = (viewport * 0.238);
        duckHitbox.speedY = 0;
        duckHitbox.gravitySpeed = 0;
        duckHitbox.gravity = 0;
      }
      canShoot = true;
  }
}

//#endregion 

//#region *** restart game function ***

const refresh = function() {
    timerOn = false;       //tijd terug uit zetten
    canShoot = false;      //niet shieten tijdens reset
    document.querySelector(".js-pause").style.display="block";
    myGameArea.stop();      //canvas freezen
              //volledige game terug aanmaken
}

//#endregion

//#region *** set rusthartslag function ***

const rusthartslag = function() {
    CalmHR = HR; //rusthartslag gelijkstellen aan hartslag
    document.querySelector('.js-rusthartslag').innerHTML = `rusthartslag: ${CalmHR}`;
    document.querySelector('.js-heartrateP1').innerHTML = CalmHR;
    if((document.querySelector(".js-1speler").classList.contains("ishidden"))){
      if(CalmHR2 > 0){
        document.querySelector(".js-connectionWindowContinue").style.backgroundColor = "#F88F3E";
      }
    }else{
      if(CalmHR > 0){
        document.querySelector(".js-connectionWindowContinue").style.backgroundColor = "#F88F3E";
      }
    }
}

const rusthartslag2 = function() {
  CalmHR2 = HR2;
  document.querySelector('.js-rusthartslag2').innerHTML = `rusthartslag: ${CalmHR2}`;
  document.querySelector('.js-heartrateP2').innerHTML = CalmHR2;
  if(CalmHR > 0){
    document.querySelector(".js-connectionWindowContinue").style.backgroundColor = "#F88F3E";
  }
}

//#endregion

//#region *** characterSelection function ***

const characterSelection = function(Number){
  var check = false;
  if((document.querySelector(".js-1speler").classList.contains("ishidden"))) //als speler 2 niet hidden is
  {
    while (duckPlayer1 == duckPlayer2 || check == false)
    {
      switch(Number)
      {
          
          case 1: duckPlayer1--; if(duckPlayer1 == -1) duckPlayer1=8; break;//player 1 left
          case 2: duckPlayer1++; if(duckPlayer1 == 9) duckPlayer1=0; break;//player 1 right
          case 3: duckPlayer2--; if(duckPlayer2 == -1) duckPlayer2=8; break;//player 2 left
          case 4: duckPlayer2++; if(duckPlayer2 == 9) duckPlayer2=0; break; //player 2 right
          
      }
      check = true;
    }
  }
  else
  {
    switch(Number)
    {
        case 1: duckPlayer1--; if(duckPlayer1== -1) duckPlayer1=8; break;//player 1 left
        case 2: duckPlayer1++; if(duckPlayer1 == 9) duckPlayer1=0; break;//player 1 right   
    }
  }
  document.getElementById("0").src= characters[duckPlayer1];
  document.getElementById("1").src= characters[duckPlayer1];
  document.getElementById("2").src= characters[duckPlayer2];
  document.getElementById("DuckP1Connect").src= characters[duckPlayer1];
  document.getElementById("DuckP2Connect").src= characters[duckPlayer2];
}
    

//#endregion

//#region *** gameSelection function ***

const gameSelection = function(Number){
  if((document.querySelector(".js-1speler").classList.contains("ishidden"))) //2 spelers
  {
      switch(Number)
      {
          case 1: gamePicture--; if(gamePicture== 1) gamePicture=4; break;//player 1 left
          case 2: gamePicture++; if(gamePicture == 5) gamePicture=2; break;//player 1 right  
      }
      switch(gamePicture){
        case 2: document.getElementById("gameMode").innerHTML = "Versus"; document.getElementById("gameTitle").innerHTML = "Brood Oorlog"; break;
        case 3: document.getElementById("gameMode").innerHTML = "Versus"; document.getElementById("gameTitle").innerHTML = "Ver Vliegen"; break;
        case 4: document.getElementById("gameMode").innerHTML = "Co-op"; document.getElementById("gameTitle").innerHTML = "Doelwit Verquakelen"; break;
      }

      document.getElementById("gamepicture").src= gameSelections[gamePicture];
  }
  else //1 speler
  {
    switch(Number)
    {
        case 1: gamePicture--; if(gamePicture == -1) gamePicture=1; break;//player 1 left
        case 2: gamePicture++; if(gamePicture == 2) gamePicture=0; break;//player 1 right  
    }
    switch(gamePicture){
      case 0: document.getElementById("gameMode").innerHTML = "Solo"; document.getElementById("gameTitle").innerHTML = "Snel Eendje"; break;
      case 1: document.getElementById("gameMode").innerHTML = "Solo"; document.getElementById("gameTitle").innerHTML = "Ver Vliegen"; break;
    }
    document.getElementById("gamepicture").src= gameSelections[gamePicture];
  }
}

//#endregion

//#region *** pause menu functions ***

const listenToButtons2 = function(){
    for(btnExit of btnExits){
      btnExit.addEventListener("click", function(){
          console.log("Exit Clicked");
          hidePauseMenu();
          document.querySelector(".js-connect").style.visibility = "hidden";
          ShowReconnectionScreen = false;

      });
    }
    btnPause.addEventListener("click", function(){
        console.log("Pause Clicked");
        showPauseMenu = true;
        document.body.classList.add("bgGamemode--blur");
    });
}

const init2 = function() {
    btnPause = document.querySelector(".js-pause");
    btnExits = document.querySelectorAll(".js-exit");
    listenToButtons2();
}
const hidePauseMenu = function(){
    showPauseMenu = false; 
    document.body.classList.remove("bgGamemode--blur");
}

const hideReconnectionWindow = function(){//hier
  
  if((document.querySelector(".js-1speler").classList.contains("ishidden"))) //2 spelers
  {
    if(CalmHR > 0 && CalmHR2 > 0) //kan alleen klikken als alle rusthartslagen geweten zijn
    {
      canAlert = true;
      document.querySelector(".js-ShowConnectionWindow").style.fill = "#EE1C25";
      document.querySelector(".js-togamemodeselect").style.fill = "#F88F3E";                   
      document.querySelector(".js-connect").style.visibility = "hidden"; 
      ShowReconnectionScreen = false;
      document.body.classList.remove("bgGamemode--blur");
    }
  }
  else {
    if(CalmHR > 0) //kan alleen klikken als rusthartslag geweten is
    {
      canAlert = true;  
      document.querySelector(".js-ShowConnectionWindow").style.fill = "#EE1C25";
      document.querySelector(".js-togamemodeselect").style.fill = "#F88F3E";                      
      document.querySelector(".js-connect").style.visibility = "hidden"; 
      ShowReconnectionScreen = false;
      document.body.classList.remove("bgGamemode--blur");
    }
  }
}

document.addEventListener("DOMContentLoaded", init2);

//#endregion

//#region *** BT connection functions ***
// hearts = document.querySelectorAll('.js-BTConnection');

// for(let heart of hearts){
//   heart.addEventListener("click", function(){
//   BTconnection();
//   })
// }


const BTconnection = function() {

    //opent de bluetooth interface van google waar je aparaten kan koppelen
    navigator.bluetooth.requestDevice({
        filters: [{
          services: ['heart_rate'],
        }]                                                      //vanaf hier paar instellingen die ik niet versta but it works :)
      }).then(device => device.gatt.connect())                  
      .then(server => server.getPrimaryService('heart_rate'))
      .then(service => {
        chosenHeartRateService = service;
        return Promise.all([
          service.getCharacteristic('heart_rate_measurement')
            .then(handleHeartRateMeasurementCharacteristic),
        ]);
      });
  };

const handleHeartRateMeasurementCharacteristic = function(characteristic) {
  document.querySelector(".js-brothistestm8").style.fill = "#EE1C25";
  isHeart1Red = true;

  if((document.querySelector(".js-1speler").classList.contains("ishidden"))) //2 spelers
  {
    if(isHeart1Red == true && isHeart2Red == true)
    {
      document.querySelector(".js-ShowConnectionWindow").style.fill = "#EE1C25"; 
      document.querySelector(".js-text").innerHTML = "Klik het hartje om je rusthartslag te meten.";
      if(CalmHR2 > 0 && CalmHR > 0){
        document.querySelector(".js-connectionWindowContinue").style.backgroundColor = "#F88F3E";
      }
    }
    else document.querySelector(".js-text").innerHTML = "Verbind de hartslagmeters."
  }
  else {
    if(isHeart1Red == true)
    {
      document.querySelector(".js-ShowConnectionWindow").style.fill = "#EE1C25"; 
      document.querySelector(".js-text").innerHTML = "Klik het hartje om je rusthartslag te meten.";
      if(CalmHR > 0){
        document.querySelector(".js-connectionWindowContinue").style.backgroundColor = "#F88F3E";
      }
    }
    else document.querySelector(".js-text").innerHTML = "Verbind de hartslagmeter.";
  }

  document.querySelector(".js-heartrateP1").classList.remove("ishidden");
  bluetoothConnected = true;
  return characteristic.startNotifications()
  .then(char => {
    characteristic.addEventListener('characteristicvaluechanged', onHeartRateChanged);
  });
}

const onHeartRateChanged = function(event) {  //wordt om de __ seconden uitgevoerd om HR aan te passen
  const characteristic = event.target;
  timeStampHR = event.timeStamp;
  HR = parseHeartRate(characteristic.value).heartRate;
  document.querySelector('.js-liveHR').innerHTML = `live heart rate: ${HR}`;
}

const BTconnection2 = function() {
  //opent de bluetooth interface van google waar je aparaten kan koppelen
  navigator.bluetooth.requestDevice({
      filters: [{
        services: ['heart_rate'],
      }]
    }).then(device => device.gatt.connect())                  //vanaf hier paar instellingen die ik niet versta
    .then(server => server.getPrimaryService('heart_rate'))
    .then(service => {
      chosenHeartRateService = service;
      return Promise.all([
        service.getCharacteristic('heart_rate_measurement')
          .then(handleHeartRateMeasurementCharacteristic2),
      ]);
    });
};

const handleHeartRateMeasurementCharacteristic2 = function(characteristic) {
document.querySelector(".js-brothistestm9").style.fill = "#EE1C25";
isHeart2Red = true;

if((document.querySelector(".js-1speler").classList.contains("ishidden"))) //2 spelers
{
  if(isHeart1Red == true && isHeart2Red == true)
  {
    document.querySelector(".js-ShowConnectionWindow").style.fill = "#EE1C25"; 
    document.querySelector(".js-text").innerHTML = "Klik het hartje om je rusthartslag te meten.";
  }
  else document.querySelector(".js-text").innerHTML = "Verbind de hartslagmeters.";
}

document.querySelector(".js-heartrateP2").classList.remove("ishidden");
bluetoothConnected2 = true;
return characteristic.startNotifications()
.then(char => {
  characteristic.addEventListener('characteristicvaluechanged', onHeartRateChanged2);
});
}

function onHeartRateChanged2(event) {
const characteristic = event.target;
timeStampHR2 = event.timeStamp;
HR2 = parseHeartRate(characteristic.value).heartRate;
document.querySelector('.js-liveHR2').innerHTML = `live heart rate: ${HR2}`;
}

function parseHeartRate(data) {         //functie die de heartrate leesbaar maakt
    const flags = data.getUint8(0);
    const rate16Bits = flags & 0x1;
    const result = {};
    let index = 1;
    if (rate16Bits) {
      result.heartRate = data.getUint16(index, /*littleEndian=*/true);
      index += 2;
    } else {
      result.heartRate = data.getUint8(index);
      index += 1;
    }
    const contactDetected = flags & 0x2;
    const contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
      result.contactDetected = !!contactDetected;
    }
    const energyPresent = flags & 0x8;
    if (energyPresent) {
      result.energyExpended = data.getUint16(index, /*littleEndian=*/true);
      index += 2;
    }
    const rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
      const rrIntervals = [];
      for (; index + 1 < data.byteLength; index += 2) {
        rrIntervals.push(data.getUint16(index, /*littleEndian=*/true));
      }
      result.rrIntervals = rrIntervals;
    }
    return result;
  }

//#endregion

//#region *** BT disconnect function ***

const checkBTconnection = function(){
  if(bluetoothConnected == true){
    if(previousTimestampHR == timeStampHR && canAlert == true){
      canAlert = false;
      alert("oeps, speler 1 is weggevlogen! 🦆");
      document.querySelector(".js-brothistestm8").style.fill = "#4A4A4A";
      isHeart1Red = false;
      document.querySelector(".js-heartrateP1").classList.add("ishidden");
      ShowReconnectionWindow();
    }
  }
  previousTimestampHR = timeStampHR;
  if(bluetoothConnected2 == true){
    if(previousTimestampHR2 == timeStampHR2 && canAlert == true){
      canAlert = false;
      alert("oeps, speler 2 is weggevlogen! 🦆");
      document.querySelector(".js-brothistestm9").style.fill = "#4A4A4A";
      isHeart2Red = false;
      ShowReconnectionWindow();
    }
  }
  previousTimestampHR2 = timeStampHR2;
}

const ShowReconnectionWindow = function(){
  ShowReconnectionScreen = true;
  document.querySelector(".js-connect").style.visibility = "visible";
  if(isHeart2Red == false || isHeart1Red == false){
    document.querySelector(".js-connectionWindowContinue").style.backgroundColor = "#4A4A4A";
  }
  document.body.classList.add("bgGamemode--blur");      //victory screen unhiden
}

//#endregion
//#region *** player 2 enable function ***

const player2enabled = function() {
  player2enable = true;
}

//#endregion


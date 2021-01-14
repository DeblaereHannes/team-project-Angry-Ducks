//#region ***  Variablen ***

let chosenHeartRateService = null;
var HR, player2enable = false, player2plays = false;
var showPauseMenu = false, btnPause,btnExit;
var canShoot, CalmHR, ShootHR,duckPlayer1 = 0; duckPlayer2 = 3;
var characters = ["", "", "","", "", "","", "", ""]
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

//#endregion

//#region *** Start Function ***

const start = function() {
    //tijd aanleggen
    if (secondsPast == 0 && showPauseMenu == false) { //timer kan niet aan worden gelegd als die al aan staat (vermijd meermaals schieten)
        timerOn = true;
        canShoot = true;
    }
}

//#endregion

//#region *** Shoot Function ***

const shoot = function() {
    //ophalen van snelheid (slider ingesteld in html: 1-6)
    if (canShoot == true && showPauseMenu == false) {
        canShoot = false;
        if(HR != null){
            ShootHR = (HR - CalmHR) / 5;
            document.querySelector('.js-shootwaarde').innerHTML = `shootwaarde: ${ShootHR}`;
            var speed = ShootHR;
        }
        else{
            var speed = parseFloat(document.getElementById("speedx").value , 10);
        }
        //console.log(speed);
        checkScore = score; //checkScore gelijkstellen zodat de score niet blijft -100 ofzo doen als de hitbox de detection raakt

        if(player2plays == true){
          duckP2.gravity = 0.05; //zwaartekracht aanmaken zodat de eend valt
          duckP2.speedX = speed; //horizontale snelheid volgens de slider waarde
          duckP2.speedY = -2; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)
        }else{
          duckP1.gravity = 0.05; //zwaartekracht aanmaken zodat de eend valt
          duckP1.speedX = speed; //horizontale snelheid volgens de slider waarde
          duckP1.speedY = -2; //verticale snelheid zodat de eend eerst beetje omhoog gaat (meer parabool vorm dan gwn vallen)
        }

        duckHitbox.gravity = 0.05;
        duckHitbox.speedX = speed;
        duckHitbox.speedY = -2;
        checkSecondsPast = secondsPast;
    }
}

//#endregion

//#region *** Reload 1 duck Function ***

const reload = function() {
  console.log("yeet");
    //locatie eend resetten
    if(secondsPast != 0 && showPauseMenu == false){
        if(player2enable == true){
          player2plays = !player2plays;
          if(player2plays == true){
            duckP2 = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), links[1], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
            duckHitbox = new component("duckhitbox", 1, 1, "black", (viewport * 0.09765625), (viewport * 0.238));
            duckP1 = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), links[0], (viewport * 0.01), (viewport * 0.4), "image");
            //console.log(duckP2);
          }else{
            duckP1 = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), links[0], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
            duckHitbox = new component("duckhitbox", 1, 1, "black", (viewport * 0.09765625), (viewport * 0.238));
            duckP2 = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), links[1], (viewport * 0.01), (viewport * 0.4), "image");
          }


        } else{
          duckP1 = new component("duck", (viewport * 0.048828125), (viewport * 0.048828125), links[0], (viewport * 0.0732421875), (viewport * 0.1904296875), "image");
          duckHitbox = new component("duckhitbox", 1, 1, "black", (viewport * 0.09765625), (viewport * 0.238));
        }
        canShoot = true;
    }
}

//#endregion 

//#region *** restart game function ***

const refresh = function() {
    timerOn = false;       //tijd terug uit zetten
    canShoot = false;
    document.querySelector(".js-pause").style.display="block";
    myGameArea.stop();      //canvas freezen
    loadGame();             //volledige game terug aanmaken
}

//#endregion

//#region *** set rusthartslag function ***

const rusthartslag = function() {
    CalmHR = HR;
    document.querySelector('.js-rusthartslag').innerHTML = `rusthartslag: ${CalmHR}`;
}

//#endregion

//#region *** characterSelection function ***

const characterSelection = function(Number){
    switch(Number)
    {
        
        case 1: duckPlayer1--; if(duckPlayer1 == duckPlayer2) duckPlayer1--; if(duckPlayer1== -1) duckPlayer1=8; break;//player 1 left
        case 2: duckPlayer1++; if(duckPlayer1 == duckPlayer2) duckPlayer1++; if(duckPlayer1 == 9) duckPlayer1=0; break;//player 1 right
        case 3: duckPlayer2--; if(duckPlayer1 == duckPlayer2) duckPlayer2--; if(duckPlayer2== -1) duckPlayer2=8; break;//player 2 left
        case 4: duckPlayer2++; if(duckPlayer1 == duckPlayer2) duckPlayer2++; if(duckPlayer2 == 9) duckPlayer2=0; break; //player 2 right
        
    }
    document.getElementById("0").src= characters[duckPlayer1];
    document.getElementById("1").src= characters[duckPlayer1];
    document.getElementById("2").src= characters[duckPlayer2];
}

//#endregion

//#region *** pause menu functions ***

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

//#endregion

//#region *** BT connection functions ***

const BTconnection = function() {
    //opent de bluetooth interface van google waar je aparaten kan koppelen
    navigator.bluetooth.requestDevice({
        filters: [{
          services: ['heart_rate'],
        }]                                                      //vanaf hier paar instellingen die ik niet versta
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

function handleHeartRateMeasurementCharacteristic(characteristic) {
    console.log(characteristic);
  return characteristic.startNotifications()
  .then(char => {
    characteristic.addEventListener('characteristicvaluechanged', onHeartRateChanged);
  });
}

function onHeartRateChanged(event) {
  const characteristic = event.target;
  //console.log(parseHeartRate(characteristic.value));
  HR = parseHeartRate(characteristic.value).heartRate;
  document.querySelector('.js-liveHR').innerHTML = `live heart rate: ${HR}`;
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

//#region *** player 2 enable function ***

const player2enabled = function() {
  timerOn = false;       //tijd terug uit zetten
  canShoot = false;
  player2enable = true;
  document.querySelector(".js-pause").style.display="block";
  myGameArea.stop();      //canvas freezen
  loadGame();             //volledige game terug aanmaken
}

//#endregion
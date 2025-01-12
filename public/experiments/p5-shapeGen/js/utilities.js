let mod2 = false;
let mod4 = false;
let mod10 = false;
let mod20 = false;
let key3 = false;


function keyPressed() { 
    if (key === '3') {
      let fs = fullscreen();
      fullscreen(!fs);
    }
  }
  
  let audioPlaying = true;
  
  function toggleAudio() {
    if (audioPlaying) {
      skyVideo.volume(0); // Mute the audio
    } else {
      skyVideo.volume(1); // Unmute the audio
    }
    audioPlaying = !audioPlaying;
  }



  let isPaused = false;
  function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
      noLoop();
    } else {
      loop();
    }
  }

  function keyPressed() {
    if (key === 'P' || key === 'p') {
      togglePause();
    }
  }



  // Timers
  function createTimers() {

    if (frameCount % 2 === 0) {
      mod2 = true;
    } else {
      mod2 = false;
    }

    if (frameCount % 4 === 0) {
      mod4 = true;
    } else {
      mod4 = false;
    }

    if (frameCount % 10 === 0) {
      mod10 = true;
    } else {
      mod10 = false;
    }

    if (frameCount % 20 === 0) {
      mod20 = true;
    } else {
      mod20 = false;
    }

  }


  // Keys
  function keyPressed() {
    if (key === '3') {
      key3 = !key3;
    } 
  }

  function keyPressed() {
    if (key === 's') {
      console.log('current state: ' + currentState);
      currentState++;
      if (currentState > numOfStates) {
        currentState = 1;
      }
    }
  }




 
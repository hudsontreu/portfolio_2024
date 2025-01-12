let context, freq1, freq2, gain, tremRate, downsampler, clickTog, clickRate, clickLvl, noiseLvl, verbMix;
let barcodeFont, srcCodePro;
let xoff = 0;
let whisperText = "Voidspire Hallowedshade Etherfall Grimclave Dreadveil Spectroweave Tenebrous Murkmind Eclipsum Voidspire Hallowedshade Etherfall Grimclave Dreadveil Spectroweave Tenebrous Murkmind Eclipsum";
let lines = [];
let roses = [];
let currentLine = "";
let charIndex = 0;
let startTime = 0;
const typingDuration = 12000;
let newTextDelay = 1000;
let poppy_images = [];
let currentPoppyIndex = 0;
let currentRoseIndex = 0;
let roseStartTime = 0;
let lastPoppyChangeTime = 0;
let state = 1;
let state2StartTime = 0;
let freq2Set = false;
let tremRate2Set = false;

let grayScale = false;
let typingActive = false;
let flash = true;


async function setupRNBO() {
  const audioContext = window.AudioContext || window.webkitAudioContext;
  context = new audioContext();

  // Fetch the exported patchers
  let response = await fetch("./rnbo_4/rnbo_p5.export.json");
  const mainPatcher = await response.json();
  response = await fetch("./rnbo_4/rnbo.platereverb.json");
  const reverbPatcher = await response.json();

  // Create the devices
  const mainDevice = await RNBO.createDevice({ context, patcher: mainPatcher });
  const reverbDevice = await RNBO.createDevice({ context, patcher: reverbPatcher });

  // Connecting the devices and context
  mainDevice.node.connect(reverbDevice.node, 0, 0); 
  mainDevice.node.connect(reverbDevice.node, 0, 1);
  reverbDevice.node.connect(context.destination);

  // Set the parameters
  verbMix = reverbDevice.parametersById.get("mix");
  verbMix.value = 28;

  freq1 = mainDevice.parametersById.get("freq1");
  freq1.value = 120;

  freq2 = mainDevice.parametersById.get("freq2");
  freq2.value = 274;

  gain = mainDevice.parametersById.get("gain");
  gain.value = 100;

  tremRate = mainDevice.parametersById.get("tremRate");
  tremRate.value = 8;

  clickTog = mainDevice.parametersById.get("clickTog");
  clickTog.value = 0;

  clickRate = mainDevice.parametersById.get("clickRate");
  clickRate.value = 100;

  clickLvl = mainDevice.parametersById.get("clickLvl");
  clickLvl.value = 80;

  downsampler = mainDevice.parametersById.get("downsampler");
  downsampler.value = 0;

  // noiseLvl = mainDevice.parametersById.get("noiseLvl");
  // noiseLvl.value = 100;

  // noiseCutoff = mainDevice.parametersById.get("noiseCutoff");
  // noiseCutoff.value = 1000;

  context.suspend();
}


function preload() {
  barcodeFont = loadFont('fonts/LibreBarcode128Text-Regular.ttf');
  srcCodePro = loadFont('fonts/SourceCodePro-VariableFont_wght.ttf');
  nowhere = loadImage('assets/nowhere.png');
  for (let i = 1; i <= 12; i++) {
    poppy_images.push(loadImage(`assets/poppies/poppy_${i}.png`));
  }
  for (let i = 1; i <= 3; i++) {
    roses.push(loadImage(`assets/roses/rose_${i}.png`));
  }
}

async function setup() {
  setupRNBO();
  createCanvas(1080, 1440);
  // createCanvas(windowWidth, windowHeight);
  textFont(srcCodePro);
  lines = loadStrings('assets/longText.txt');
  pickRandomLine();
  roseStartTime = millis();
  downsampler = { value: 0 };
  freq1 = { value: 120 };
  freq2 = { value: 80 };
  tremRate = { value: 4 };
  clickTog = { value: 0 };
  verbMix = { value: 28 };
}

function draw() {
  if (state === 1) {
    drawState1();
  } else if (state === 2) {
    drawState2();
  }
}



// STATE 1
function drawState1() {
  background(0, typingActive ? 100 : 38);
  displayRoses();

  // Image flasher state settings
  blendMode(DIFFERENCE);
  if (flash && millis() - lastPoppyChangeTime > 50) { 
    currentPoppyIndex = int(random(poppy_images.length));
    lastPoppyChangeTime = millis();
    clickTog.value = 0;
    verbMix.value = 36;
    freq2.value = 274;
    if (!tremRate2Set) {
      tremRate.value = random(7, 12);
      tremRate2Set = true;
      console.log(tremRate.value);
    } 
  } 
  if(!flash){ tremRate2Set = false };
  image(poppy_images[currentPoppyIndex], 145, 287, 935, 720);


  // Still gray state settings
  if (grayScale) {
    filter(GRAY);
    tremRate.value = 0;
    verbMix.value = 60;
    clickTog.value = 1;
    if (!freq2Set) {
      freq2.value = selectRandomOption(320, 400, 440, 480);
      freq2Set = true;
      console.log(freq2.value);
    }
  } else {
    freq2Set = false;
  }


   // Lines
  push();
  // fill(160, 120, 140);
  if (typingActive) {
    fill(255, 0, 0); // Red color while text is typing out
  } else {
    fill(255); // White color otherwise
  }
  xoff += 0.01;
  for (let x = 0; x <= width; x += 5) {
    let y = map(noise(xoff), 0, 1, 0, height);
    ellipse(x, y, 5, 5);
    downsampler.value = map(y, 0, height, 7, 0);
    freq1.value = map(y, 0, height, 280, 20);
  }
  pop();


   // Selecting image flash/gray state
   if (typingActive) {
    flash = false;
    grayScale = true;
  } else {
    flash = true;
    grayScale = false;
  }

  // Text typeout logic
  textFont(srcCodePro);
  if (frameCount % newTextDelay == 0) {
    pickRandomLine();
  }
  
  let elapsedTime = millis() - startTime;
  charIndex = int(map(elapsedTime, 0, typingDuration, 0, currentLine.length));

  // Set typingActive variable to true or false
  typingActive = charIndex < currentLine.length;

  push();
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  textWrap(WORD);
  textLeading(38);
  text(currentLine.substring(0, charIndex), 145, 1096, 460);
  pop();

  blendMode(BLEND);
  
}


function pickRandomLine() {
  if (lines.length > 0) {
    currentLine = lines[int(random(lines.length))];
    charIndex = 0;
    startTime = millis();
  }
}


// STATE 2
function drawState2() {
  background(0);
  textFont(barcodeFont);

  if (random(1) < 0.7) {
    fill(255);
    textSize(84);
    textAlign(CENTER, CENTER);
    text("who left the door open to nowhere", width / 2, height / 2);
  }
  downsampler.value = 8;
  freq2.value = 100;
}




function displayRoses() {
  let elapsedTime = millis() - roseStartTime;
  if (elapsedTime > currentRoseIndex * 400) {
    image(roses[currentRoseIndex], 820, 1048 + currentRoseIndex * 120, 120, 120);
    if (elapsedTime > (currentRoseIndex + 1) * 400) {
      if (currentRoseIndex < 2) {
        currentRoseIndex++;
      } else {
        currentRoseIndex = 0;
        roseStartTime = millis();
      }
    }
  }
}





// HELPER FUNCTIONS

function startAudio() {
  context.resume();
}

function stopAudio() {
  context.suspend();
}

function toggleLoop() {
  if (isLooping) {
    noLoop();
    stopAudio();
  } else {
    loop();
    startAudio();
  }
  isLooping = !isLooping;
}

function keyPressed() {
  if (key === '1') {
    state = 1;
  } else if (key === '2') {
    state = 2;
  } else if (key === '3') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function selectRandomOption(...options) {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}


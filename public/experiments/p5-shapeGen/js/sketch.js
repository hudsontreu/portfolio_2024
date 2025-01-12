let currentState = 1;
let numOfStates = 5;
let bgVideo = false;
let splatterBuffer;
let cheetah;
let flowersVid;
let sunflowerVid;
let ghostVid;



function preload() {
  flowersVid = createVideo(['assets/neon_floral.mp4']);
  sunflowerVid = createVideo(['assets/sunflower.mp4']);
  ghostVid = createVideo(['assets/ghost.mp4']);
  cheetah = loadImage('assets/cheetah.png');
}

function setup() {
  createCanvas(1920, 1080);
  pixelDensity(2);
  smooth();
  frameRate(30);
  background(12);

  sunflowerVid.hide();
  sunflowerVid.loop();
  flowersVid.hide();
  flowersVid.loop();
  ghostVid.hide();
  ghostVid.loop();

  textAlign(CENTER, CENTER);
  textFont('Source Code Pro');
  noStroke();
  
  splatterBuffer = createGraphics(width, height);

  for (let i = 0; i < width / 20; i++) {
    matrixSymbols.push(new MatrixSymbol(i * 20, random(-height, 0), random(2, 5)));
  }
}

function startVideos() {
  sunflowerVid.hide();
  sunflowerVid.loop();
  flowersVid.hide();
  flowersVid.loop();
  ghostVid.hide();
  ghostVid.loop();
  console.log('videos started');
}

function draw() {

  createTimers();

  // currentState = 5;
 
  switch (currentState) {
    case 1:
      state_flash(false);
      break;
    case 2:
      state_flowers();
      break;
      case 3:
      state_flowers();
      state_flash(false);
      break;
      case 4:
      state_sunflower();
      break;
      case 5:
      state_shapesAndRain();
      break;
    default:
      state_flash();
  }
  
}


function state_flash(invert) {
  if (mod20) {clear(); background(0, 200)};
  if (bgVideo) {
    tint(100, 150);
    image(flowersVid, 0, 0, width, height);
  }
  blendMode(DIFFERENCE);
  createShapes(200, 2);
  nums();
  push();
  if (mod4 && random() > 0.9) {
    drawSplatter(splatterBuffer);
  }
  image(splatterBuffer, 0, 0);

  if (invert) {filter(INVERT)};

}

function state_flowers() {
  image(flowersVid, 0, 0, width, height);

  blendMode(DIFFERENCE);
  createShapes(200, 2);
  nums();

  push();
  translate(random(width), random(height));
  push();
  scale(0.5);
  createShapes(200);
  pop();
}

function state_sunflower() {
  image(sunflowerVid, 0, 0, width, height);
  matrixRain();
  blendMode(DIFFERENCE);
  createShapes(280, 1.5);
}

function state_shapesAndRain() {
  matrixRain();
  blendMode(DIFFERENCE);
  createShapes(280, 1.5);
}





let shapes = [];
let currentShapeIndex = 0;
let xPos = 200;
let spacing = 200;
let bgVid = 0;
let scaryNums = '011_0_0_110';
let matrixSymbols = [];



function createShapes(size, yValue) {
    let rand = random();
    if (rand > 0.4 && rand < 0.9 && shapes.length < 8) {
        let shape = new ShapeGenerator(xPos + shapes.length * spacing, height / 2, size);
        shapes.push(shape);
    } else if (rand <= 0.4 && shapes.length > 0) {
        shapes.pop();
    }

    for (let i = 0; i < shapes.length; i++) {
        shapes[i].display(xPos + i * spacing, height / yValue);
    }
}

function createShapesSingular() {
  strokeWeight(3);
  let rand = random();
  if (rand > 0.4 && rand < 0.9 && shapes.length === 0) {
    let shape = new ShapeGenerator(width / 2, height / 2, 600);
    shapes.push(shape);
  } else if (rand <= 0.4 && shapes.length > 0) {
    shapes.pop();
  }

  if (shapes.length > 0) {
    shapes[0].display(width / 2, height / 2);
  }
}

function nums() {
    if(mod4) {
        let firstThree = `${int(random(2))}${int(random(2))}${int(random(2))}`;
        let lastThree = `${int(random(2))}${int(random(2))}${int(random(2))}`;
        scaryNums = `${firstThree}_0_0_${lastThree}`;
    }
    textSize(220);
    fill(255);
    text(scaryNums, width / 2, height / 2);
}


function drawSplatter(buffer) {
    buffer.push();
    buffer.clear();
    let numRects = int(random(4, 21)); // Number of rectangles to draw, random between 4 and 20
  
    for (let i = 0; i < numRects; i++) {
      let x = random(buffer.width);
      let y = random(buffer.height);
      let w = random(2, 30); // Random width
      let h = random(2, 30); // Random height
  
      // Randomly choose between orange and green
      if (random() < 0.5) {
        buffer.fill(255, 165, 0); // Orange
      } else {
        buffer.fill(200, 200, 200);
      }
  
      buffer.rect(x, y, w, h);
    }
    buffer.pop();
  }



  function matrixRain() {
    for (let symbol of matrixSymbols) {
      symbol.update();
      symbol.display();
    }
  }



  
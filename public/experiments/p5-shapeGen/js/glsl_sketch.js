
let myShader;


function setup() {
  createCanvas(800, 800, WEBGL);
  myShader = loadShader('example.vert', 'example.frag'); 
}

function draw() {
  background(255);
  noStroke();
  
  shader(myShader);
  
  // Pass the time from p5 to the shader
  myShader.setUniform('time', millis());
  
  // Draw a shape using the shader
  circle(0, 0, 400);
}
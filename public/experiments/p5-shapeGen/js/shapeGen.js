class ShapeGenerator {
  constructor(xPos, yPos, sizeOf) {
    this.baseShape = null;
    this.lines = [];
    this.generateBaseShapeAndLines(xPos, yPos, sizeOf);
  }

  generateBaseShapeAndLines(xPos, yPos, sizeOf) {
    // Generate a single base shape
    stroke(255);
    noFill();
    rectMode(CENTER);
    ellipseMode(CENTER);
    let shapeType = random(['rectangle', 'ellipse', 'none']);
    let x = xPos;
    let y = yPos;
    let size = sizeOf;

    if (shapeType === 'rectangle') {
      let width = random(size - 100, size + 100);
      let height = random(size - 100, size + 100);
      this.baseShape = { shapeType, x, y, width, height };
    } else if (shapeType === 'ellipse') {
      let width = random(size - 40, size + 40);
      let height = width;
      this.baseShape = { shapeType, x, y, width, height };
    } else {
      this.baseShape = { shapeType, x, y };
    }

    // Generate random lines attached to the base shape
    let numLines = random(3, 12);
    for (let i = 0; i < 10; i++) {
      let x1, y1, x2, y2;
      if (this.baseShape.shapeType === 'rectangle' || this.baseShape.shapeType === 'ellipse') {
        x1 = this.baseShape.x + random(-this.baseShape.width / 2, this.baseShape.width / 2);
        y1 = this.baseShape.y + random(-this.baseShape.height / 2, this.baseShape.height / 2);
        x2 = this.baseShape.x + random(-this.baseShape.width / 2, this.baseShape.width / 2);
        y2 = this.baseShape.y + random(-this.baseShape.height / 2, this.baseShape.height / 2);
      } else {
        x1 = this.baseShape.x + random(-size / 2, size / 2);
        y1 = this.baseShape.y + random(-size / 2, size / 2);
        x2 = this.baseShape.x + random(-size / 2, size / 2);
        y2 = this.baseShape.y + random(-size / 2, size / 2);
      }
      this.lines.push({ x1, y1, x2, y2 });
    }
  }

  display(x, y) {
    // Display the base shape
    if (this.baseShape.shapeType === 'rectangle') {
      rect(x, y, this.baseShape.width, this.baseShape.height);
    } else if (this.baseShape.shapeType === 'ellipse') {
      ellipse(x, y, this.baseShape.width, this.baseShape.height);
    }

    // Display lines
    for (let l of this.lines) {
      line(
        x + (l.x1 - this.baseShape.x),
        y + (l.y1 - this.baseShape.y),
        x + (l.x2 - this.baseShape.x),
        y + (l.y2 - this.baseShape.y)
      );
    }
  }
}
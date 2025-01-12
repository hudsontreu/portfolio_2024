class MatrixSymbol {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.value = this.getRandomSymbol();
    }
  
    getRandomSymbol() {
      const charCode = 0x30A0 + floor(random(0, 96));
      return String.fromCharCode(charCode);
    }
  
    update() {
      this.y += this.speed;
      if (this.y > height) {
        this.y = 0;
        this.value = this.getRandomSymbol();
      }
    }
  
    display() {
      fill(255, 168, 54);
      text(this.value, this.x, this.y);
    }
  }
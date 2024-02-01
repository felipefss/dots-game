class Game {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.distanceBetweenDots = 25;
    this.offsetX = 12;
    this.offsetY = 12;
    this.size = Math.floor(canvas.width / this.distanceBetweenDots);
    this.players = [new Player('1'), new Player('2')];
    this.currentPlayer = this.players[0];
    this.mouse = {
      x: 0,
      y: 0,
      isClicked: false,
    };
    this.links = [];

    canvas.addEventListener('mousemove', (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
      this.mouse = { x, y };
    });

    canvas.addEventListener('click', () => {
      this.mouse.isClicked = true;
    });
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    // Render board
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        ctx.beginPath();
        ctx.ellipse(
          this.offsetX + i * this.distanceBetweenDots,
          this.offsetY + j * this.distanceBetweenDots,
          2,
          2,
          0,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }

    // Render links
    this.links.forEach((link) => {
      ctx.beginPath();
      ctx.moveTo(link.p1.coords.x, link.p1.coords.y);
      ctx.lineTo(link.p2.coords.x, link.p2.coords.y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = link.color;
      ctx.stroke();
    });

    const { x: mouseX, y: mouseY, isClicked } = this.mouse;
    const startX =
      this.offsetX + Math.floor((mouseX - this.offsetX) / this.distanceBetweenDots) * this.distanceBetweenDots;
    const startY =
      this.offsetY + Math.floor((mouseY - this.offsetY) / this.distanceBetweenDots) * this.distanceBetweenDots;
    const startPoint = new Point(
      Math.floor((mouseY - this.offsetY) / this.distanceBetweenDots),
      Math.floor((mouseX - this.offsetX) / this.distanceBetweenDots),
      { x: startX, y: startY }
    );
    let endPoint = null;

    // Horizontal hover
    if (
      mouseX > startX &&
      mouseX < startX + this.distanceBetweenDots &&
      mouseY >= startY - 3 &&
      mouseY <= startY + 3 &&
      startX + this.distanceBetweenDots < this.canvas.width &&
      startX >= this.offsetX
    ) {
      endPoint = new Point(startPoint.i, startPoint.j + 1, { x: startX + this.distanceBetweenDots, y: startY });

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + this.distanceBetweenDots, startY);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'gray';
      ctx.stroke();
    }

    // Vertical hover
    if (
      mouseY > startY &&
      mouseY < startY + this.distanceBetweenDots &&
      mouseX >= startX - 3 &&
      mouseX <= startX + 3 &&
      startY + this.distanceBetweenDots < this.canvas.height &&
      startY >= this.offsetY
    ) {
      endPoint = new Point(startPoint.i + 1, startPoint.j, { x: startX, y: startY + this.distanceBetweenDots });
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX, startY + this.distanceBetweenDots);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'gray';
      ctx.stroke();
    }

    if (endPoint && isClicked) {
      this.mouse.isClicked = false;
      this.links.push(new Link(startPoint, endPoint, this.currentPlayer.color));
      this.currentPlayer = this.players.find((player) => player !== this.currentPlayer);
      console.log(this.currentPlayer);
    }
  }
}

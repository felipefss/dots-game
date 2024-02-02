import { isEqual } from 'lodash';

import { Link } from './Link';
import { Player } from './Player';
import { Point } from './Point';

export class Game {
  canvas: HTMLCanvasElement;
  distanceBetweenDots: number;
  offsetX: number;
  offsetY: number;
  size: number;
  players: Player[];
  currentPlayer: Player;
  mouse: {
    x: number;
    y: number;
    isClicked: boolean;
  };
  links: Link[];
  squares: {
    p1: Point;
    text: string;
  }[];

  constructor(canvas: HTMLCanvasElement) {
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
    this.squares = [];

    canvas.addEventListener('mousemove', (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
      this.mouse.x = x;
      this.mouse.y = y;
    });

    canvas.addEventListener('click', () => {
      this.mouse.isClicked = true;
    });
  }

  render(ctx: CanvasRenderingContext2D) {
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

    // Render players initials in squares
    this.squares.forEach((square) => {
      ctx.font = '18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(square.text, square.p1.coords.x + 12.5, square.p1.coords.y + 12.5);
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

    // Save player selection and check for completed square
    if (endPoint && isClicked) {
      this.mouse.isClicked = false;
      let wasSquareCompleted = false;
      const newLink = new Link(startPoint, endPoint, this.currentPlayer.color);

      if (!Link.includes(this.links, newLink)) {
        this.links.push(newLink);
        this.links.sort(Link.sort);

        // Get all horizontal links, except for the last row
        const horizontalLinks = this.links.filter((link) => link.p1.i === link.p2.i && link.p1.i < this.size);

        // Check for completed square
        horizontalLinks.forEach((link) => {
          const p1 = link.p1;
          const p2 = new Point(p1.i, p1.j + 1, { x: p1.coords.x + this.distanceBetweenDots, y: p1.coords.y });
          const p3 = new Point(p1.i + 1, p1.j, { x: p1.coords.x, y: p1.coords.y + this.distanceBetweenDots });
          const p4 = new Point(p1.i + 1, p1.j + 1, {
            x: p1.coords.x + this.distanceBetweenDots,
            y: p1.coords.y + this.distanceBetweenDots,
          });

          if (
            Link.includes(this.links, new Link(p1, p2)) &&
            Link.includes(this.links, new Link(p1, p3)) &&
            Link.includes(this.links, new Link(p3, p4)) &&
            Link.includes(this.links, new Link(p2, p4)) &&
            !this.squares.find((square) => isEqual(square.p1, p1))
          ) {
            this.squares.push({
              p1,
              text: this.currentPlayer.initial,
            });
            wasSquareCompleted = true;
          }
        });

        if (!wasSquareCompleted) {
          this.currentPlayer = this.players.find((player) => player !== this.currentPlayer) ?? this.currentPlayer;
        }
      }
    }
    // TODO: Calculate winner based on "size - 1" squares
  }
}

const canvas = document.getElementById('canvas');
const ctx = canvas?.getContext('2d');
// const canvasWidth = canvas?.width;
// const distanceBetweenDots = 25;
// const offsetX = 12;
// const offsetY = 12;
// const size = Math.floor(canvasWidth / distanceBetweenDots);
const game = new Game(canvas);
// game.render(ctx);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.render(ctx);
  requestAnimationFrame(animate);
}

animate();

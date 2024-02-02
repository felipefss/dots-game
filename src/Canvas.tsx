import { useEffect, useRef } from 'react';

import { Game } from './models/Game';

function animate(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: Game) {
  ctx.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
  game.render(ctx);
  requestAnimationFrame(() => animate(canvas, ctx, game));
}

export function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return;
    }

    const game = new Game(canvas);

    animate(canvas, ctx, game);
  }, []);

  return <canvas ref={ref} className="bg-white rounded-sm" width={700} height={700} />;
}

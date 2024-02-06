import { useEffect, useRef } from 'react';

import { Game } from '../models/Game';
import { useGameContext } from '../hooks/useGameContext';

function animate(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: Game) {
  ctx.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
  game.render(ctx);
  requestAnimationFrame(() => animate(canvas, ctx, game));
}

export function Canvas() {
  const { players } = useGameContext();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return;
    }

    const game = new Game(canvas, [players.p1.name, players.p2.name]);

    animate(canvas, ctx, game);
  }, [players]);

  return <canvas ref={ref} className="bg-white rounded-sm" width={700} height={700} />;
}

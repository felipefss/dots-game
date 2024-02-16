import { memo, useEffect, useRef } from 'react';

import { Game } from '../models/Game';
import { useGameContext } from '../hooks/useGameContext';

export function CanvasComponent() {
  const { players, updateScore } = useGameContext();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return;
    }

    const game = new Game(canvas, [players.p1, players.p2]);

    function animate(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: Game) {
      ctx.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
      game.render(ctx, updateScore);
      requestAnimationFrame(() => animate(canvas, ctx, game));
    }

    animate(canvas, ctx, game);
  }, [players, updateScore]);

  return <canvas ref={ref} className="bg-white rounded-sm" width={700} height={700} />;
}

export const Canvas = memo(CanvasComponent);

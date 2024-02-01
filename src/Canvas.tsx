import { useEffect, useRef } from 'react';

export function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    const offsetX = 10;
    const offsetY = 10;

    if (ctx) {
      ctx.beginPath();
      ctx.ellipse(offsetX + 0, offsetY + 0, 2, 2, 0, 0, 2 * Math.PI);
      ctx.ellipse(offsetX + 0 * 25, offsetY + 1 * 25, 2, 2, 0, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, []);

  return <canvas ref={ref} className="bg-white rounded-sm" width={700} height={700} />;
}

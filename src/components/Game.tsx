import { useGameContext } from '../hooks/useGameContext';
import { Canvas } from './Canvas';

export function Game() {
  const {
    players: { p1, p2 },
  } = useGameContext();

  return (
    <>
      <section className="flex flex-col w-full">
        <span className="text-2xl text-center">Score:</span>
        <div className="flex justify-around">
          <span>
            {p1.name}: {p1.score}
          </span>
          <span>
            {p2.name}: {p2.score}
          </span>
        </div>
      </section>

      <Canvas />
    </>
  );
}

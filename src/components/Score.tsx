import { useGameContext } from '../hooks/useGameContext';

export function Score() {
  const {
    players: { p1, p2 },
    score,
  } = useGameContext();

  return (
    <section className="flex flex-col w-[40%]">
      <span className="text-2xl text-center">Score:</span>
      <div className="flex justify-between">
        <span>
          {p1}: {score[0]}
        </span>
        <span>
          {p2}: {score[1]}
        </span>
      </div>
    </section>
  );
}

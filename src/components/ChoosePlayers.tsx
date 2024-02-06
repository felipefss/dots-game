import { FormEvent } from 'react';
import { useGameContext } from '../hooks/useGameContext';

export function ChoosePlayers() {
  const { startGame } = useGameContext();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const player1 = formData.get('player1')?.toString();
    const player2 = formData.get('player2')?.toString();

    startGame(player1, player2);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl">Choose players names:</h2>
      <form className="flex flex-col items-center justify-center gap-2" onSubmit={handleSubmit}>
        <div>
          <label className="mr-2">Player 1:</label>
          <input className="p-1 rounded-sm outline-slate-600" type="text" name="player1" placeholder="Player 1" />
        </div>

        <div>
          <label className="mr-2">Player 2:</label>
          <input className="p-1 rounded-sm outline-slate-600" type="text" name="player2" placeholder="Player 2" />
        </div>

        <button className="bg-slate-600 pl-8 pr-8 pt-2 pb-2 rounded-sm text-gray-200 hover:opacity-75" type="submit">
          Start
        </button>
      </form>
    </div>
  );
}

import { ChoosePlayers } from './components/ChoosePlayers';
import { Game } from './components/Game';
import { useGameContext } from './hooks/useGameContext';
import { GameState } from './types/gameTypes';

export default function App() {
  const { gameState } = useGameContext();

  return (
    <main className="bg-slate-300 flex flex-col h-dvh items-center p-4 gap-4">
      <h1 className="text-4xl">Dots Game</h1>

      {gameState === GameState.ChoosePlayers && <ChoosePlayers />}
      {gameState === GameState.Playing && <Game />}
    </main>
  );
}

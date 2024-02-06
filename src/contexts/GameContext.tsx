import { ReactNode, createContext, useState } from 'react';
import { isEmpty } from 'lodash';
import { GameState, Players } from '../types/gameTypes';

interface ContextProps {
  gameState: GameState;
  players: Players;
  startGame: (player1: string | undefined, player2: string | undefined) => void;
}

export const GameContext = createContext({} as ContextProps);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState(GameState.ChoosePlayers);
  const [players, setPlayers] = useState<Players>({ p1: { name: '', score: 0 }, p2: { name: '', score: 0 } });

  function startGame(player1?: string, player2?: string) {
    const p1Name = isEmpty(player1) ? '1' : player1;
    const p2Name = isEmpty(player2) ? '2' : player2;

    setPlayers({ p1: { name: p1Name as string, score: 0 }, p2: { name: p2Name as string, score: 0 } });
    setGameState(GameState.Playing);
  }

  return (
    <GameContext.Provider
      value={{
        gameState,
        players,
        startGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

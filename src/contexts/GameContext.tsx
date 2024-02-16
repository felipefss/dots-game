import { ReactNode, createContext, useCallback, useState } from 'react';
import { isEmpty } from 'lodash';
import { GameState, Players, PlayersScore } from '../types/gameTypes';

interface ContextProps {
  gameState: GameState;
  players: Players;
  score: number[];
  startGame: (player1: string | undefined, player2: string | undefined) => void;
  updateScore: ({ player1Score, player2Score }: PlayersScore) => void;
}

export const GameContext = createContext({} as ContextProps);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState(GameState.ChoosePlayers);
  const [players, setPlayers] = useState<Players>({ p1: '', p2: '' });
  const [score, setScore] = useState([0, 0]);

  function startGame(player1?: string, player2?: string) {
    const p1Name = isEmpty(player1) ? '1' : player1;
    const p2Name = isEmpty(player2) ? '2' : player2;

    setPlayers({ p1: p1Name as string, p2: p2Name as string });
    setGameState(GameState.Playing);
  }

  const updateScore = useCallback(({ player1Score, player2Score }: PlayersScore) => {
    setScore([player1Score, player2Score]);
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        score,
        players,
        startGame,
        updateScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

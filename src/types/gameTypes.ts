export enum GameState {
  ChoosePlayers,
  Playing,
  GameOver,
}

export interface Players {
  p1: string;
  p2: string;
}

export interface PlayersScore {
  player1Score: number;
  player2Score: number;
}

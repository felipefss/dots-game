export enum GameState {
  ChoosePlayers,
  Playing,
  GameOver,
}

export interface Players {
  p1: {
    name: string;
    score: number;
  };
  p2: {
    name: string;
    score: number;
  };
}

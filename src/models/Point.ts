type Coordinates = {
  x: number;
  y: number;
};

export class Point {
  i: number;
  j: number;
  coords: Coordinates;

  constructor(i: number, j: number, { x, y }: Coordinates) {
    this.coords = { x, y };
    this.i = i;
    this.j = j;
  }

  toString() {
    return `(${this.i}, ${this.j})`;
  }
}

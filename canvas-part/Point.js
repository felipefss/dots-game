class Point {
  constructor(i, j, { x, y }) {
    this.coords = { x, y };
    this.i = i;
    this.j = j;
  }

  toString() {
    return `(${this.i}, ${this.j})`;
  }

  equals(other) {
    return this.i === other.i && this.j === other.j;
  }
}
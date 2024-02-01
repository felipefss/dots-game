class Link {
  constructor(p1, p2, color) {
    this.p1 = p1;
    this.p2 = p2;
    this.color = color;
  }

  equals(other) {
    return this.p1 === other.p1 && this.p2 === other.p2;
  }
}

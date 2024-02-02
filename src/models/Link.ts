import { isEqual } from 'lodash';
import { Point } from './Point';

export class Link {
  p1: Point;
  p2: Point;
  color: string;

  static includes(arr: Link[], link: Link) {
    return arr.some((l) => isEqual(l.p1, link.p1) && isEqual(l.p2, link.p2));
  }

  static sort(a: Link, b: Link) {
    if (a.p1.i < b.p1.i || (a.p1.i === b.p1.i && a.p1.j < b.p1.j)) {
      return -1;
    }

    if (a.p1.i > b.p1.i || (a.p1.i === b.p1.i && a.p1.j > b.p1.j)) {
      return 1;
    }

    return 0;
  }

  constructor(p1: Point, p2: Point, color = 'black') {
    this.p1 = p1;
    this.p2 = p2;
    this.color = color;
  }
}

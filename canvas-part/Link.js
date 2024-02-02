class Link {
  static includes(arr, link) {
    return arr.some((l) => _.isEqual(l.p1, link.p1) && _.isEqual(l.p2, link.p2));
  }

  // static binaryIndexSearch(arr, link) {
  //   let left = 0;
  //   let right = arr.length - 1;

  //   while (left <= right) {
  //     const mid = Math.floor((left + right) / 2);

  //     if (_.isEqual(arr[mid].p1, link.p1) && _.isEqual(arr[mid].p2, link.p2)) {
  //       return mid;
  //     }

  //     if (arr[mid].p1.i < link.p1.i || (arr[mid].p1.i === link.p1.i && arr[mid].p1.j < link.p1.j)) {
  //       left = mid + 1;
  //     } else {
  //       right = mid - 1;
  //     }
  //   }

  //   return -1;
  // }

  static sort(a, b) {
    if (a.p1.i < b.p1.i || (a.p1.i === b.p1.i && a.p1.j < b.p1.j)) {
      return -1;
    }

    if (a.p1.i > b.p1.i || (a.p1.i === b.p1.i && a.p1.j > b.p1.j)) {
      return 1;
    }

    return 0;
  }

  constructor(p1, p2, color) {
    this.p1 = p1;
    this.p2 = p2;
    this.color = color;
  }
}

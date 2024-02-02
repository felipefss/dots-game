function generateRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export class Player {
  name: string;
  initial: string;
  color: string;

  constructor(name: string, color = generateRandomColor()) {
    this.name = name;
    this.initial = name[0];
    this.color = color;
  }
}

function generateRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class Player {
  constructor(name, color = generateRandomColor()) {
    this.name = name;
    this.initial = name[0];
    this.color = color;
  }
}

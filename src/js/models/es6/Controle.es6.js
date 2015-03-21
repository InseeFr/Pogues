class Controle {
  constructor() {
    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.description = '';
    this.expression = '';
  }
}

export default Controle;

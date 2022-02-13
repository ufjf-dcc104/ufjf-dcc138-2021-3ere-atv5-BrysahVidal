export default class Mixer {
  constructor(numCanais) {
    this.CANAIS = 0;
    this.canais = [];
    this.configuraCanais(numCanais);
  }
  configuraCanais(numCanais = 10) {
    this.canais = [];
    this.CANAIS = numCanais;
    for (let c = 0; c < this.CANAIS; c++) {
      const canal = {
        fim: new Date().getTime(),
        audio: new Audio(),
      };
      this.canais[c] = canal;
    }
  }

  play(audio) {
    const agora = new Date().getTime();
    for (let c = 0; c < this.CANAIS; c++) {
      const canal = this.canais[c];

      if (agora > canal.fim) {
        canal.audio.src = audio.src;
        canal.audio.play();
        canal.fim = agora + audio.duration * 1000;
        break;
      }
    }
  }
}

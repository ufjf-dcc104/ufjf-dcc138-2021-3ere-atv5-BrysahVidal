import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../maps/mapa1.js"

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {
        if (!this.aRemover.includes(a)) {
            this.aRemover.push(a);
        }
        if (!this.aRemover.includes(b)) {
            this.aRemover.push(b);
        }
        if (a.tags.has("pc") && b.tags.has("enemy")) {
            this.game.selecionaCena("fim");
        }
    }

    preparar() {
        super.preparar();
        const mapa1 = new Mapa(10, 14, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);
        
        const cena = this;
        const pc  = new Sprite({ x: 50,   y: 150  });
        pc.tags.add("pc");
        pc.controlar = function (dt) {
            if (cena.input.comandos.get("MOVE_ESQUERDA")) {
                this.vx = -50;
                this.vy = 0;
            } else if (cena.input.comandos.get("MOVE_DIREITA")) {
                this.vx = +50;
                this.vy = 0;
            } 

            if (cena.input.comandos.get("MOVE_CIMA")) {
                this.vx = 0;
                this.vy = -50;
            } else if (cena.input.comandos.get("MOVE_BAIXO")) {
                this.vx = 0;
                this.vy = +50;
            } 
        }
        this.adicionar(pc);
        
        function perseguePC(dt) {
            this.vx = 25 * Math.sign(pc.x - this.x);
            this.vy = 25 * Math.sign(pc.y - this.y);
        }

        const en1 = new Sprite({ x: 360, color: "red", controlar: perseguePC, tags: ["enemy"] });
        this.adicionar(en1);
       
    }
    
    
}
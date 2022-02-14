import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../maps/mapa1.js"

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {

        if (a.tags.has("pc") && b.tags.has("enemy")) {
            if(this.vidas == 1)
            {
                this.game.selecionaCena("fim");
            }else{
            this.aRemover.push(b);
            this.vidas--;
            }
        }
        else if (a.tags.has("pc") && b.tags.has("coin")) {
            if(this.score == 5)
            {
                this.game.selecionaCena("fim");
            }else{
                this.aRemover.push(b);
                this.score++;
            }
        }
        
    }

    preparar() {
        super.preparar();
        const mapa1 = new Mapa(10, 14, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);
        
        const cena = this;
        const pc  = new Sprite({ x: 5 * 14,   y:2 * 18 });
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
            this.vx = 20 * Math.sign(pc.x - this.x);
            this.vy = 20 * Math.sign(pc.y - this.y);
            
        }

        const en1 = new Sprite({ x: 115 ,y: 150 ,color: "red", controlar: perseguePC, tags: ["enemy"] });
        this.adicionar(en1);

        this.adicionar(new Sprite({ x: 201, y: 70 , color: "red", controlar: perseguePC, tags: ["enemy"] }));
        this.adicionar(new Sprite({ x: 302, y: 160, color: "red", controlar: perseguePC, tags: ["enemy"] }));

        this.adicionar(new Sprite({ x: 150, y: 140 ,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 300, y: 210,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 150, y: 70 ,w: 10 , h: 10, color: "yellow ", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 250, y: 300,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));

        this.adicionar(new Sprite({ x: 600, y: 140 ,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 330, y: 210,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 470, y: 300,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
       
    }
    
    
}
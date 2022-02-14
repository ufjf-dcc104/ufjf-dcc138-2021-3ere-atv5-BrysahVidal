import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../maps/mapa1.js"

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {

        if (a.tags.has("pc") && b.tags.has("enemy")) {
            if(this.vidas == 1)
            {
                this.assets.play("morte");
                this.game.selecionaCena("gameover");
            }else{
            this.assets.play("waka");
            this.aRemover.push(b);
            this.vidas--;
            this.adicionar(new Sprite({ x: 201, y: 70 , color: "red", controlar: this.perseguePC, tags: ["enemy"] }));
            
        }
        }
        else if (a.tags.has("pc") && b.tags.has("coin")) {
            if(this.score == 9)
            {
                this.assets.play("abertura");
                this.game.selecionaCena("vitoria");
            }else{
                if(this.score % 2 == 0)
                {
                            for (let i = 0; i < this.sprites.length; i++) {
                                if(this.sprites[i].tags.has("enemy"))
                                {
                                    this.sprites[i].vx += 7;
                                    this.sprites[i].vy += 7;
                                }
                                
                            }
                            a.vx += 5;
                            a.vy += 5;
                }
                this.assets.play("moeda");
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
            this.vx = 20 * Math.sign(pc.x - this.x) - 0.2 * this.vx;
            this.vy = 20 * Math.sign(pc.y - this.y) - 0.2 * this.vy;
            
        }


        const en1 = new Sprite({ x: 145 ,y:  150 ,color: "red", controlar: perseguePC, tags: ["enemy"] });
        this.adicionar(en1);

        this.adicionar(new Sprite({ x: 201, y: 70 , color: "red", controlar: perseguePC, tags: ["enemy"] }));
        this.adicionar(new Sprite({ x: 302, y: 160, color: "red", controlar: perseguePC, tags: ["enemy"] }));

        this.adicionar(new Sprite({ x: 150, y: 140 ,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 300, y: 280,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 150, y: 70 ,w: 10 , h: 10, color: "yellow ", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 250, y: 300,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));

        this.adicionar(new Sprite({ x: 600, y: 140 ,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 360, y: 210,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 470, y: 300,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
       
        this.adicionar(new Sprite({ x: 630, y: 170 ,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 390, y: 240,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 470, y: 360,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 420, y: 270,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));
        this.adicionar(new Sprite({ x: 210, y: 270,w: 10 , h: 10, color: "yellow", tags: ["coin"] }));

       
    }
    
    
}
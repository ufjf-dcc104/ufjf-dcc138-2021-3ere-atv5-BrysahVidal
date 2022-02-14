import AssetManager from "./AssetManager.js";
import Mixer from "./mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";
import CenaFimGameOver from "./CenaFimGameOver.js";
import CenaFimWin from "../CenaFimWin.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);


assets.carregaAudio("moeda", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");


const canvas = document.querySelector("canvas");
canvas.width = 18 * 32;
canvas.height = 14 * 32;

input.configurarTeclado({
    ArrowLeft: "MOVE_ESQUERDA",
    ArrowRight: "MOVE_DIREITA",
    ArrowUp: "MOVE_CIMA",
    ArrowDown: "MOVE_BAIXO",
    " ": "PROXIMA CENA",
});

const game = new Game(canvas, assets, input);

const cena0 = new CenaCarregando(canvas, assets);
const cena1 = new CenaJogo(canvas, assets);
const cena2 = new CenaFimWin(canvas, assets);
const cena3 = new CenaFimGameOver(canvas, assets);
game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo", cena1);
game.adicionarCena("vitoria", cena2);
game.adicionarCena("gameover", cena3);


game.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            game.iniciar();
            break;
        case "S":
            game.parar();
            break;
    }
})
import 'phaser';
import Board from './Board/Board';
import { GameHistory } from './Board/GameHistory';
import Enemy from './Enemy';
import Player from './Player';
import * as consts from './Utils/consts';
import drawUi from './UI/ui';

export let scene
export let board: Board;
export let player: Player;
export let enemy: Enemy;
export let gameHistory: GameHistory;
export let checkText;

let debugGraphics;
let keyRdy: boolean = true;
// eslint-disable-next-line import/no-mutable-exports
export let debugText;

export class GameScene extends Phaser.Scene {
    private moveKeys;
    private isDebug: boolean = false;
    
    constructor() {
        super({});
        scene = this;
    }

    preload() {
        consts.CANVAS.WIDTH = game.canvas.width;
        consts.CANVAS.HEIGHT = game.canvas.height;

        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const bckgcolor = `#${randomColor}`;
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(bckgcolor);
        
        debugText = this.add.text(250, 200, '', { color: '#2e3440' }).setDepth(2);
        debugText.setVisible(false);

        this.load.image('whiteTile', 'assets/whiteTile.png');
        this.load.image('blackTile', 'assets/blackTile.png');
        this.load.image('grayTile', 'assets/grayTile.png');
        this.load.image('bubble', 'assets/bubble.png');

        this.load.image('whitePawn', 'assets/whitePawn.png');
        this.load.image('blackPawn', 'assets/blackPawn.png');

        this.load.image('whiteKing', 'assets/whiteKing.png');
        this.load.image('blackKing', 'assets/blackKing.png');

        this.load.image('whiteQueen', 'assets/whiteQueen.png');
        this.load.image('blackQueen', 'assets/blackQueen.png');

        this.load.image('whiteBishop', 'assets/whiteBishop.png');
        this.load.image('blackBishop', 'assets/blackBishop.png');

        this.load.image('whiteRook', 'assets/whiteRook.png');
        this.load.image('blackRook', 'assets/blackRook.png');

        this.load.image('whiteKnight', 'assets/whiteKnight.png');
        this.load.image('blackKnight', 'assets/blackKnight.png');

        this.load.image('undoBtn', 'assets/undoBtn.png');
        this.load.image('redoBtn', 'assets/redoBtn.png');
    }

    create() {
        this.setKeys();
        this.newGame();
    }

    // eslint-disable-next-line class-methods-use-this
    newGame() {
        drawUi();
        checkText = this.add.text(100, 100, 'Check', { font: '35px' }).setVisible(false);
        player = new Player();
        enemy = new Enemy();
        board = new Board();
        gameHistory = new GameHistory(board.pieceMap);
    }

    // eslint-disable-next-line class-methods-use-this
    public changeTurn() {
        player.setTurn(!player.isTurn);
        enemy.setTurn(!enemy.isTurn);
        if (enemy.isMyTurn()) {
            enemy.turn();
        }
    }

    public checkMate() {
        checkText.setText('Check Mate')
        checkText.setVisible(true);
    }

    update() {
        window.addEventListener('keydown', () => {
            this.time.delayedCall(40, () => {
                keyRdy = true;
            }, [], this);

            if (keyRdy === true) {
                if (this.moveKeys.left.isDown) {
                    this.showDebugger();
                }
            }

            keyRdy = false;
        });
    }

    setKeys() {
        this.input.keyboard.createCursorKeys();

        this.moveKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    showDebugger() {
        this.isDebug = !this.isDebug;
        
        if (this.isDebug) {
            debugText.setVisible(true);
            const rect = new Phaser.Geom.Rectangle(250, 200, 300, 200);
            debugGraphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
            debugGraphics.fillRectShape(rect);
        } else {
            debugText.setVisible(false);
            debugGraphics.clear();
        }
    }
}

export const config = {
    type: Phaser.AUTO,
    width: '150%',
    height: '150%',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade'
        // arcade: {
        //   debug: true,
        // },
    },
    scene: GameScene
};

export const game = new Phaser.Game(config);

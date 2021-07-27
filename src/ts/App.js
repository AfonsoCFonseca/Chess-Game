"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.game = exports.config = exports.GameScene = exports.enemy = exports.player = exports.board = exports.scene = void 0;
require("phaser");
var Board_1 = require("./Board/Board");
var Enemy_1 = require("./Enemy");
var Player_1 = require("./Player");
var consts = require("./Utils/consts");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this, {}) || this;
        exports.scene = _this;
        return _this;
    }
    GameScene.prototype.preload = function () {
        consts.CANVAS.WIDTH = exports.game.canvas.width;
        consts.CANVAS.HEIGHT = exports.game.canvas.height;
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        var bckgcolor = "#" + randomColor;
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(bckgcolor);
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
    };
    GameScene.prototype.create = function () {
        this.newGame();
        //this.physics.add.overlap( this.enemiesGroup, this.player, this.collision );
    };
    GameScene.prototype.newGame = function () {
        exports.player = new Player_1.Player();
        exports.enemy = new Enemy_1.Enemy();
        exports.board = new Board_1.Board();
    };
    GameScene.prototype.changeTurn = function () {
        exports.player.setTurn(!exports.player.isTurn);
        exports.enemy.setTurn(!exports.enemy.isTurn);
        if (exports.enemy.isMyTurn()) {
            exports.enemy.turn();
        }
    };
    GameScene.prototype.update = function () {
    };
    GameScene.prototype.setKeys = function () {
        this.input.keyboard.createCursorKeys();
        this.moveKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;
exports.config = {
    type: Phaser.AUTO,
    width: '150%',
    height: "150%",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
    },
    scene: GameScene,
};
exports.game = new Phaser.Game(exports.config);

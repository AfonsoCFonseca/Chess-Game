"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("./Utils/utils");
var App_1 = require("./App");
var Enemy = /** @class */ (function () {
    function Enemy() {
        this.myPieces = [];
        this.isTurn = false;
    }
    Enemy.prototype.setTurn = function (isTurn) {
        this.isTurn = isTurn;
    };
    Enemy.prototype.isMyTurn = function () {
        return this.isTurn;
    };
    Enemy.prototype.turn = function () {
        var totalPiecesNum = this.myPieces.length;
        var rndPieceNum;
        var rndPiece;
        var possibleMoves;
        do {
            rndPieceNum = Math.floor(utils.rndNumber(0, totalPiecesNum));
            rndPiece = this.myPieces[rndPieceNum];
            possibleMoves = rndPiece.showPossibleMoves();
        } while (!possibleMoves || possibleMoves.length <= 0);
        var suggestedTileLength = possibleMoves.length;
        var numb = Math.floor(utils.rndNumber(0, suggestedTileLength));
        var suggestedTile = possibleMoves[numb];
        this.myPieces[rndPieceNum].to(suggestedTile);
        App_1.scene.changeTurn();
    };
    Enemy.prototype.removePieceFromArray = function (piece) {
    };
    return Enemy;
}());
exports.Enemy = Enemy;

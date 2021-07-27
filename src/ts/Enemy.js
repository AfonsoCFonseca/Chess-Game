"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enemy = void 0;
var utils = require("./Utils/utils");
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
        console.log("enemy Moving");
        var totalPiecesNum = this.myPieces.length;
        var rndPieceNum = Math.floor(utils.rndNumber(0, totalPiecesNum));
        console.log(rndPieceNum);
        console.log(this.myPieces[rndPieceNum].showPossibleMoves());
        if (this.myPieces[rndPieceNum].showPossibleMoves()) {
            console.log("possible");
        }
    };
    return Enemy;
}());
exports.Enemy = Enemy;

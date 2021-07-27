"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player() {
        this.myPieces = [];
        this.isTurn = true;
    }
    Player.prototype.setTurn = function (isTurn) {
        this.isTurn = isTurn;
    };
    Player.prototype.isMyTurn = function () {
        return this.isTurn;
    };
    Player.prototype.removePieceFromArray = function (piece) {
    };
    return Player;
}());
exports.Player = Player;

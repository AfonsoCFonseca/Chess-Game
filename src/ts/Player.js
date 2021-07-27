"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
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
    return Player;
}());
exports.Player = Player;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var GameHistory = /** @class */ (function () {
    function GameHistory(pieceMap) {
        this.history = [];
        this.currentTurn = 1;
        this.actualTurn = 1;
        this.history.push(_.cloneDeep(pieceMap));
    }
    GameHistory.prototype.saveInteraction = function (newTurnMap) {
        this.currentTurn++;
        this.actualTurn++;
        var newArray = _.cloneDeep(newTurnMap);
        this.history.push(newArray);
    };
    GameHistory.prototype.getInteraction = function () {
    };
    GameHistory.prototype.setToActualTurn = function () {
        this.currentTurn = this.actualTurn;
        return this.currentTurn;
    };
    GameHistory.prototype.isActualTurn = function () {
        return this.currentTurn === this.actualTurn;
    };
    GameHistory.prototype.getPreviousInteraction = function () {
        var previousTurn = this.currentTurn - 1;
        if (this.history[previousTurn - 1]) {
            this.currentTurn--;
            return this.history[previousTurn - 1];
        }
        return this.history[this.currentTurn - 1];
    };
    GameHistory.prototype.getNextInteraction = function () {
        console.log("NEXT");
    };
    return GameHistory;
}());
exports.GameHistory = GameHistory;

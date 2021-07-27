"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piece = void 0;
var App_1 = require("../App");
var game_interfaces_1 = require("../game.interfaces");
var Piece = /** @class */ (function () {
    function Piece(tilePos, color, type) {
        this.currentTile = tilePos;
        this.color = color;
        this.type = type;
    }
    Piece.prototype.getTile = function () {
        return this.currentTile;
    };
    Piece.prototype.isPlayerPiece = function () {
        if (this.color == game_interfaces_1.piecesColors.BLACK)
            return false;
        else
            return true;
    };
    Piece.prototype.showPossibleMoves = function (tiles) {
        App_1.board.clearPreviousPossibleMoves(tiles);
        return tiles;
    };
    Piece.prototype.to = function (newTile) {
        var previousTile = this.currentTile;
        this.currentTile = newTile.tilePosition;
        App_1.board.updateMap(previousTile, this.currentTile, this);
        this.pieceImage.x = newTile.position.positionX;
        this.pieceImage.y = newTile.position.positionY;
    };
    return Piece;
}());
exports.Piece = Piece;
//return Car.prototype.carBoundary.call( this, this.direction, this.currentTilePosition  )

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var game_interfaces_1 = require("../game.interfaces");
var Piece_1 = require("./Piece");
var utils = require("../Utils/utils");
var App_1 = require("../App");
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(tilePos, color) {
        var _this = this;
        var _a = utils.converToPositionSize(tilePos), positionX = _a.positionX, positionY = _a.positionY;
        var imageName = (color == game_interfaces_1.piecesColors.WHITE ? 'white' : 'black') + "Pawn";
        _this = _super.call(this, { positionX: positionX, positionY: positionY }, color, game_interfaces_1.piecesType.PAWN, imageName) || this;
        return _this;
    }
    Pawn.prototype.showPossibleMoves = function () {
        var possibleTiles = [];
        possibleTiles = this.frontMoves(this.currentTile);
        var diagonalPossibleTiles = this.diagonalMoves(this.currentTile);
        var finalPossibleTiles = possibleTiles.concat(diagonalPossibleTiles);
        return _super.prototype.showPossibleMoves.call(this, finalPossibleTiles);
    };
    Pawn.prototype.frontMoves = function (_a) {
        var tileX = _a.tileX, tileY = _a.tileY;
        var arrOfPossibleTiles = [];
        var nextTileY = this.color == game_interfaces_1.piecesColors.BLACK ? tileY + 1 : tileY - 1;
        arrOfPossibleTiles.push({ tileX: tileX, tileY: nextTileY });
        if (this.firstTurn) {
            nextTileY = this.color == game_interfaces_1.piecesColors.BLACK ? ++nextTileY : --nextTileY;
            arrOfPossibleTiles.push({ tileX: tileX, tileY: nextTileY });
        }
        if (this.canFrontalMove(arrOfPossibleTiles))
            return App_1.board.getTiles(arrOfPossibleTiles);
        else
            return [];
    };
    Pawn.prototype.diagonalMoves = function (_a) {
        var tileX = _a.tileX, tileY = _a.tileY;
        var arrOfPossibleTiles = [];
        for (var i = 0; i < 2; i++) {
            var nextTileX = i == 0 ? tileX + 1 : tileX - 1;
            var nextTileY = tileY + (this.color == game_interfaces_1.piecesColors.BLACK ? +1 : -1);
            if (this.canDiagonalMove(nextTileX, nextTileY))
                arrOfPossibleTiles.push({ tileX: nextTileX, tileY: nextTileY });
        }
        return App_1.board.getTiles(arrOfPossibleTiles);
    };
    Pawn.prototype.canDiagonalMove = function (nextTileX, nextTileY) {
        var piece = App_1.board.getPieceOnTile({ tileX: nextTileX, tileY: nextTileY });
        return piece && piece.color == (App_1.player.isMyTurn() ? game_interfaces_1.piecesColors.BLACK : game_interfaces_1.piecesColors.WHITE);
    };
    Pawn.prototype.canFrontalMove = function (arrOfPossibleTiles) {
        var canMove = true;
        arrOfPossibleTiles.forEach(function (_a) {
            var tileX = _a.tileX, tileY = _a.tileY;
            var piece = App_1.board.getPieceOnTile({ tileX: tileX, tileY: tileY });
            if (piece)
                canMove = false;
        });
        return canMove;
    };
    return Pawn;
}(Piece_1.Piece));
exports.Pawn = Pawn;

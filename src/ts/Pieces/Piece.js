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
var App_1 = require("../App");
var game_interfaces_1 = require("../game.interfaces");
var utils = require("../Utils/utils");
var Piece = /** @class */ (function (_super) {
    __extends(Piece, _super);
    function Piece(_a, color, type, imageName) {
        var positionX = _a.positionX, positionY = _a.positionY;
        var _this = _super.call(this, App_1.scene, positionX, positionY, imageName, 0) || this;
        _this.firstTurn = true;
        App_1.scene.add.existing(_this);
        App_1.scene.physics.world.enable(_this);
        _this.currentTile = utils.converToTileSize({ positionX: positionX, positionY: positionY });
        _this.color = color;
        _this.type = type;
        return _this;
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
        if (App_1.player.isMyTurn()) { //Drawer
            App_1.board.clearPreviousPossibleMoves(tiles);
            App_1.board.currentPossibleMoves.forEach(function (tile, index, object) {
                if (tile) {
                    if (App_1.board.isTileFree(tile))
                        tile.setAsPossibleMove();
                    else
                        object.splice(index, 1);
                }
            });
        }
        return tiles;
    };
    Piece.prototype.to = function (newTile) {
        this.firstTurn = false;
        var previousTile = this.currentTile;
        this.currentTile = newTile.tilePosition;
        App_1.board.updateMap(previousTile, this.currentTile, this);
        this.x = newTile.position.positionX;
        this.y = newTile.position.positionY;
    };
    Piece.prototype.eat = function (piece) {
        App_1.board.removePiecefromGame(piece.getTile());
        if (piece.color == game_interfaces_1.piecesColors.BLACK)
            App_1.enemy.removePieceFromArray(piece);
        else
            App_1.player.removePieceFromArray(piece);
        piece.destroy();
    };
    return Piece;
}(Phaser.GameObjects.Sprite));
exports.Piece = Piece;
//return Car.prototype.carBoundary.call( this, this.direction, this.currentTilePosition  )

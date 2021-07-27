"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("../Utils/utils");
var App_1 = require("../App");
var Tile = /** @class */ (function () {
    function Tile(position, tileName) {
        var _this = this;
        this.position = position;
        this.tilePosition = utils.converToTileSize(position);
        this.tileImg = App_1.scene.add.image(position.positionX, position.positionY, tileName);
        this.tileImg.setInteractive({ useHandCursor: true });
        this.tileImg.on('pointerdown', function () {
            if (App_1.player.isMyTurn() && App_1.gameHistory.isActualTurn()) {
                var piece = _this.getPieceOnTile();
                if (piece && piece.isPlayerPiece()) {
                    App_1.board.setCurrentTile(_this);
                    App_1.board.selectedPiece = piece;
                    piece.showPossibleMoves();
                }
            }
        });
        this.possibleTileImg = App_1.scene.add.image(position.positionX, position.positionY, "bubble");
        this.possibleTileImg.visible = false;
        this.possibleTileImg.setInteractive({ useHandCursor: true });
        this.possibleTileImg.on('pointerdown', function () {
            if (_this.possibleTileImg.visible) {
                App_1.board.selectedPiece.to(_this);
                App_1.board.currentTile.setAsNormal();
                App_1.board.clearPreviousPossibleMoves(null);
                App_1.gameHistory.setToActualTurn();
                App_1.scene.changeTurn();
            }
        });
    }
    Tile.prototype.getPieceOnTile = function () {
        return App_1.board.getPieceOnTile(this.tilePosition);
    };
    Tile.prototype.setAsSelected = function () {
        this.tileImg.setTexture('grayTile');
    };
    Tile.prototype.setAsNormal = function () {
        this.possibleTileImg.visible = false;
        var tileName = utils.getNameOfTile(this.tilePosition);
        this.tileImg.setTexture(tileName);
    };
    Tile.prototype.setAsPossibleMove = function () {
        this.possibleTileImg.visible = true;
    };
    return Tile;
}());
exports.Tile = Tile;

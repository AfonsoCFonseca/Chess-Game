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
exports.Pawn = void 0;
var game_interfaces_1 = require("../game.interfaces");
var Piece_1 = require("./Piece");
var utils = require("../Utils/utils");
var App_1 = require("../App");
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(tilePos, color) {
        var _this = _super.call(this, tilePos, color, game_interfaces_1.piecesType.PAWN) || this;
        var _a = utils.converToPositionSize(tilePos), positionX = _a.positionX, positionY = _a.positionY;
        var imageName = (color == game_interfaces_1.piecesColors.WHITE ? 'white' : 'black') + "Pawn";
        _this.pieceImage = App_1.scene.add.image(positionX, positionY, imageName);
        return _this;
    }
    Pawn.prototype.showPossibleMoves = function () {
        //Colocar aqui enemy e player
        var _a = App_1.board.currentTile.tilePosition, tileX = _a.tileX, tileY = _a.tileY;
        var possibleTilePos = { tileX: tileX, tileY: --tileY };
        var possibleTilePos1 = { tileX: tileX, tileY: --tileY };
        var possibleTiles = App_1.board.getTiles([possibleTilePos, possibleTilePos1]);
        possibleTiles.forEach(function (tile, index, object) {
            if (App_1.board.isTileFree(tile))
                tile.setAsPossibleMove();
            else
                object.splice(index, 1);
        });
        return _super.prototype.showPossibleMoves.call(this, possibleTiles);
    };
    return Pawn;
}(Piece_1.Piece));
exports.Pawn = Pawn;

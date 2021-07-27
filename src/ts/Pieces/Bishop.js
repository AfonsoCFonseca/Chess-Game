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
exports.Bishop = void 0;
var game_interfaces_1 = require("../game.interfaces");
var Piece_1 = require("./Piece");
var utils = require("../Utils/utils");
var App_1 = require("../App");
var Bishop = /** @class */ (function (_super) {
    __extends(Bishop, _super);
    function Bishop(tilePos, color) {
        var _this = _super.call(this, tilePos, color, game_interfaces_1.piecesType.BISHOP) || this;
        var _a = utils.converToPositionSize(tilePos), positionX = _a.positionX, positionY = _a.positionY;
        var imageName = (color == game_interfaces_1.piecesColors.WHITE ? 'white' : 'black') + "Bishop";
        _this.pieceImage = App_1.scene.add.image(positionX, positionY, imageName);
        return _this;
    }
    return Bishop;
}(Piece_1.Piece));
exports.Bishop = Bishop;

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
exports.King = void 0;
var game_interfaces_1 = require("../game.interfaces");
var Piece_1 = require("./Piece");
var utils = require("../Utils/utils");
var App_1 = require("../App");
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(tilePos, color) {
        var _this = _super.call(this, tilePos, color, game_interfaces_1.piecesType.KING) || this;
        var _a = utils.converToPositionSize(tilePos), positionX = _a.positionX, positionY = _a.positionY;
        var imageName = (color == game_interfaces_1.piecesColors.WHITE ? 'white' : 'black') + "King";
        _this.pieceImage = App_1.scene.add.image(positionX, positionY, imageName);
        return _this;
    }
    return King;
}(Piece_1.Piece));
exports.King = King;

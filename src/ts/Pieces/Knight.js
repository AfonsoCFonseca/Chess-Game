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
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(tilePos, color) {
        var _this = this;
        var _a = utils.converToPositionSize(tilePos), positionX = _a.positionX, positionY = _a.positionY;
        var imageName = (color == game_interfaces_1.piecesColors.WHITE ? 'white' : 'black') + "Knight";
        _this = _super.call(this, { positionX: positionX, positionY: positionY }, color, game_interfaces_1.piecesType.KNIGHT, imageName) || this;
        return _this;
    }
    return Knight;
}(Piece_1.Piece));
exports.Knight = Knight;

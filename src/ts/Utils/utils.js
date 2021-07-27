"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rndNumber = exports.getNameOfTile = exports.getTypeByName = exports.getColorByName = exports.getHalfScreenHeight = exports.getHalfScreenWidth = exports.converToPositionSize = exports.converToTileSize = void 0;
var game_interfaces_1 = require("../game.interfaces");
var consts = require("../Utils/consts");
function converToTileSize(_a) {
    var positionX = _a.positionX, positionY = _a.positionY;
    var tileX = positionX - getHalfScreenWidth();
    tileX /= consts.TILE_SIZE;
    var tileY = positionY - getHalfScreenHeight();
    tileY /= consts.TILE_SIZE;
    return {
        tileX: tileX,
        tileY: tileY
    };
}
exports.converToTileSize = converToTileSize;
function converToPositionSize(_a) {
    var tileX = _a.tileX, tileY = _a.tileY;
    var positionX = tileX * consts.TILE_SIZE;
    positionX += getHalfScreenWidth();
    var positionY = tileY * consts.TILE_SIZE;
    positionY += getHalfScreenHeight();
    return {
        positionX: positionX,
        positionY: positionY
    };
}
exports.converToPositionSize = converToPositionSize;
function getHalfScreenWidth() {
    return consts.CANVAS.WIDTH / 2 - consts.BACKGROUND_WIDHT / 2;
}
exports.getHalfScreenWidth = getHalfScreenWidth;
function getHalfScreenHeight() {
    return consts.CANVAS.HEIGHT / 2 - consts.BACKGROUND_HEIGHT / 2;
}
exports.getHalfScreenHeight = getHalfScreenHeight;
function getColorByName(name) {
    if (name[0] == "b")
        return game_interfaces_1.piecesColors.BLACK;
    else
        return game_interfaces_1.piecesColors.WHITE;
}
exports.getColorByName = getColorByName;
function getTypeByName(name) {
    switch (name[1]) {
        case "r":
            return game_interfaces_1.piecesType.ROOK;
        case "p":
            return game_interfaces_1.piecesType.PAWN;
        case "n":
            return game_interfaces_1.piecesType.KNIGHT;
        case "q":
            return game_interfaces_1.piecesType.QUEEN;
        case "k":
            return game_interfaces_1.piecesType.KING;
        case "b":
            return game_interfaces_1.piecesType.BISHOP;
        default:
            return null;
    }
}
exports.getTypeByName = getTypeByName;
function getNameOfTile(_a) {
    var tileX = _a.tileX, tileY = _a.tileY;
    if (tileX % 2 == 0 && tileY % 2 == 0 ||
        tileX % 2 != 0 && tileY % 2 != 0)
        return "whiteTile";
    else
        return "blackTile";
}
exports.getNameOfTile = getNameOfTile;
function rndNumber(min, max) {
    return Math.random() * (max - min) + min;
}
exports.rndNumber = rndNumber;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var consts = require("../Utils/consts");
var utils = require("../Utils/utils");
var Pawn_1 = require("../Pieces/Pawn");
var Queen_1 = require("../Pieces/Queen");
var King_1 = require("../Pieces/King");
var Rook_1 = require("../Pieces/Rook");
var Bishop_1 = require("../Pieces/Bishop");
var Knight_1 = require("../Pieces/Knight");
var Tile_1 = require("../Board/Tile");
var game_interfaces_1 = require("../game.interfaces");
var App_1 = require("../App");
var Board = /** @class */ (function () {
    function Board() {
        this.pieces = [[]];
        this.tiles = [[]];
        this.previousTile = null;
        this.currentPossibleMoves = [];
        this.previousPossibleMoves = null;
        this.selectedPiece = null;
        this.pieceMap = [
            ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
            ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
            ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
            ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
            ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
            ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
            ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
            ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
        ];
        this.drawBoard();
    }
    Board.prototype.drawBoard = function () {
        for (var i = 0; i < consts.BOARD_SIZE; i++) {
            this.tiles[i] = [];
            for (var j = 0; j < consts.BOARD_SIZE; j++) {
                var positionY = (i * consts.TILE_SIZE) + utils.getHalfScreenHeight();
                var positionX = (j * consts.TILE_SIZE) + utils.getHalfScreenWidth();
                var tileName = utils.getNameOfTile({ tileX: i, tileY: j });
                this.tiles[i].push(new Tile_1.Tile({ positionX: positionX, positionY: positionY }, tileName));
            }
        }
        this.drawPieces();
    };
    Board.prototype.drawPieces = function () {
        for (var i = 0; i < this.pieceMap.length; i++) {
            this.pieces[i] = [];
            for (var j = 0; j < this.pieceMap[i].length; j++) {
                var color = utils.getColorByName(this.pieceMap[i][j]);
                var newPiece = this.newPiece(i, j, color);
                this.pieces[i].push(newPiece);
                if (color == game_interfaces_1.piecesColors.BLACK)
                    App_1.enemy.myPieces.push(newPiece);
                else
                    App_1.player.myPieces.push(newPiece);
            }
        }
        App_1.debugText.setText(this.pieceMap);
    };
    Board.prototype.newPiece = function (i, j, color) {
        var tilePos = { tileX: j, tileY: i };
        var abbr = this.pieceMap[i][j];
        switch (utils.getTypeByName(abbr)) {
            case game_interfaces_1.piecesType.ROOK:
                return new Rook_1.Rook(tilePos, color);
            case game_interfaces_1.piecesType.PAWN:
                return new Pawn_1.Pawn(tilePos, color);
            case game_interfaces_1.piecesType.KNIGHT:
                return new Knight_1.Knight(tilePos, color);
            case game_interfaces_1.piecesType.QUEEN:
                return new Queen_1.Queen(tilePos, color);
            case game_interfaces_1.piecesType.KING:
                return new King_1.King(tilePos, color);
            case game_interfaces_1.piecesType.BISHOP:
                return new Bishop_1.Bishop(tilePos, color);
            default:
                return null;
        }
    };
    Board.prototype.updateMap = function (previousTile, newPos, piece) {
        var tileX = previousTile.tileX, tileY = previousTile.tileY;
        this.pieces[tileY][tileX] = null;
        this.pieceMap[tileY][tileX] = "  ";
        var existantPiece = this.getPieceOnTile({ tileY: newPos.tileY, tileX: newPos.tileX });
        if (existantPiece)
            piece.eat(existantPiece);
        this.pieces[newPos.tileY][newPos.tileX] = piece;
        this.pieceMap[newPos.tileY][newPos.tileX] = "" + (App_1.player.isMyTurn() ? "w" : "b") + piece.type;
        App_1.debugText.setText(this.pieceMap);
        App_1.gameHistory.saveInteraction(this.pieceMap);
    };
    Board.prototype.setCurrentTile = function (current) {
        if (current && this.currentTile) {
            this.previousTile = this.currentTile;
            this.previousTile.setAsNormal();
        }
        this.currentTile = current;
        this.currentTile.setAsSelected();
        return this.currentTile;
    };
    Board.prototype.getPieceOnTile = function (_a) {
        var tileX = _a.tileX, tileY = _a.tileY;
        return this.pieces[tileY][tileX];
    };
    Board.prototype.getTiles = function (tilePos) {
        var _this = this;
        var tiles = [];
        tilePos.map(function (tile, i) {
            var tileY = tile.tileY, tileX = tile.tileX;
            tiles.push(_this.tiles[tileY][tileX]);
        });
        return tiles;
    };
    Board.prototype.isTileFree = function (tile) {
        var _a = tile.tilePosition, tileX = _a.tileX, tileY = _a.tileY;
        var tileMapValue = this.pieceMap[tileY][tileX];
        var color = App_1.player.isMyTurn() ? game_interfaces_1.piecesColors.BLACK : game_interfaces_1.piecesColors.WHITE;
        if (tileMapValue == "  " || utils.getColorByName(tileMapValue) == color)
            return true;
        else
            return false;
    };
    Board.prototype.clearPreviousPossibleMoves = function (newPossibleMoves) {
        if (this.currentPossibleMoves) {
            this.previousPossibleMoves = this.currentPossibleMoves;
            this.previousPossibleMoves.map(function (tile) {
                if (tile)
                    tile.setAsNormal();
            });
        }
        this.currentPossibleMoves = newPossibleMoves;
    };
    Board.prototype.removePiecefromGame = function (_a) {
        var tileX = _a.tileX, tileY = _a.tileY;
        this.pieces[tileY][tileX] = null;
        this.pieceMap[tileY][tileX] = "  ";
    };
    Board.prototype.undo = function () {
        var currentBoard = App_1.gameHistory.getPreviousInteraction();
        this.pieceMap = currentBoard;
        this.drawBoard();
    };
    Board.prototype.redo = function () {
        App_1.gameHistory.getNextInteraction();
    };
    return Board;
}());
exports.Board = Board;

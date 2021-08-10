import * as _ from 'lodash';
import * as consts from '../Utils/consts';
import * as utils from '../Utils/utils';
import Pawn from '../Pieces/Pawn';
import Queen from '../Pieces/Queen';
import King from '../Pieces/King';
import Rook from '../Pieces/Rook';
import Bishop from '../Pieces/Bishop';
import Knight from '../Pieces/Knight';
import Piece from '../Pieces/Piece';
import Tile from './Tile';
import { PiecesColors, PiecesType, TilePositionInterface } from '../game.interfaces';
import {
    player, enemy, debugText, gameHistory
} from '../App';

export default class Board {
    public pieces: Piece[][] = [[]];
    public tiles: Tile[][] = [[]];
    public currentTile: Tile;
    public previousTile: Tile = null;

    public currentPossibleMoves: Tile[] = [];
    public previousPossibleMoves: Tile[] = null;

    public selectedPiece: Piece = null;

    public pieceMap = [
        ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
        ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
        ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
        ['  ', '  ', '  ', '  ', 'br', '  ', '  ', '  '],
        ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
        ['  ', '  ', '  ', 'wr', '  ', '  ', '  ', '  '],
        ['wp', 'wp', 'wp', 'wp', 'bq', '  ', 'wp', 'wp'],
        ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
    ];

    constructor() {
        this.drawBoard();
    }

    public drawBoard(): void {
        for (let i = 0; i < consts.BOARD_SIZE; i++) {
            this.clearBoard(this.tiles[i]);
            this.tiles[i] = [];
            for (let j = 0; j < consts.BOARD_SIZE; j++) {
                const positionY: number = (i * consts.TILE_SIZE) + utils.getHalfScreenHeight();
                const positionX: number = (j * consts.TILE_SIZE) + utils.getHalfScreenWidth();
                const tileName: string = utils.getNameOfTile({ tileX: i, tileY: j });
                this.tiles[i].push(new Tile({ positionX, positionY }, tileName));
            }
        }

        this.drawPieces();
    }

    private drawPieces(): void {
        for (let i = 0; i < this.pieceMap.length; i++) {
            this.clearPieces(this.pieces[i]);
            this.pieces[i] = [];
            for (let j = 0; j < this.pieceMap[i].length; j++) {
                const color = utils.getColorByName(this.pieceMap[i][j]);
                const newPiece = this.newPiece(i, j, color);
                this.pieces[i].push(newPiece);
                if (newPiece && color === PiecesColors.BLACK) enemy.myPieces.push(newPiece);
                else if (newPiece && color === PiecesColors.WHITE) player.myPieces.push(newPiece);
            }
        }

        debugText.setText(this.pieceMap);
    }

    private clearBoard(tiles:Tile[]) {
        if (tiles && tiles.length > 0) {
            for (let j = 0; j < consts.BOARD_SIZE; j++) {
                tiles[j].destroyTile();
                delete this.tiles[j];
            }
        }
    }

    private clearPieces(pieces:Piece[]) {
        let isFirstTime = true;
        if (pieces && pieces.length > 0) {
            for (let j = 0; j < consts.BOARD_SIZE; j++) {
                if (pieces[j]) {
                    isFirstTime = false;
                    pieces[j].destroy();
                    delete this.pieces[j];
                }
            }
        }
        if (!isFirstTime) {
            enemy.resetPieceArray();
            player.resetPieceArray();
        }
    }

    private newPiece(i: number, j: number, color: PiecesColors): Piece {
        const tilePos = { tileX: j, tileY: i };
        const abbr = this.pieceMap[i][j];
        switch (utils.getTypeByName(abbr)) {
            case PiecesType.ROOK:
                return new Rook(tilePos, color);
            case PiecesType.PAWN:
                return new Pawn(tilePos, color);
            case PiecesType.KNIGHT:
                return new Knight(tilePos, color);
            case PiecesType.QUEEN:
                return new Queen(tilePos, color);
            case PiecesType.KING:
                return new King(tilePos, color);
            case PiecesType.BISHOP:
                return new Bishop(tilePos, color);
            default:
                return null;
        }
    }

    public updateMap(previousTile: TilePositionInterface, newPos: TilePositionInterface, piece: Piece) {
        const { tileX, tileY } = previousTile;
        this.pieces[tileY][tileX] = null;
        this.pieceMap[tileY][tileX] = '  ';

        const existantPiece = this.getPieceOnTile({ tileY: newPos.tileY, tileX: newPos.tileX });
        if (existantPiece) piece.eat(existantPiece);

        this.pieces[newPos.tileY][newPos.tileX] = piece;
        this.pieceMap[newPos.tileY][newPos.tileX] = `${player.isMyTurn() ? 'w' : 'b'}${piece.type}`;

        debugText.setText(this.pieceMap);
        gameHistory.saveInteraction(this.pieceMap);
    }

    public setCurrentTile(current: Tile): Tile {
        if (current && this.currentTile) {
            this.previousTile = this.currentTile;
            this.previousTile.setAsNormal();
        }
        this.currentTile = current;
        this.currentTile.setAsSelected();
        return this.currentTile;
    }

    public getPieceOnTile({ tileX, tileY }: TilePositionInterface): Piece | null {
        if (this.pieces[tileY] && this.pieces[tileX]) {
            return this.pieces[tileY][tileX];
        }
        return null;
    }

    public getTiles(tilePos: TilePositionInterface[] | TilePositionInterface): Tile[] | Tile {
        if (Array.isArray(tilePos)) {
            const tiles: Tile[] = [];
            tilePos.forEach((tile) => {
                const { tileY, tileX } = tile;
                tiles.push(this.tiles[tileY][tileX]);
            });
            return tiles;
        }
        return this.tiles[tilePos.tileY][tilePos.tileX];
    }

    public isTileFree(tile: Tile): boolean {
        const { tileX, tileY } = tile.tilePosition;
        const tileMapValue = this.pieceMap[tileY][tileX];
        const color = player.isMyTurn() ? PiecesColors.BLACK : PiecesColors.WHITE;
        return (tileMapValue === '  ' || utils.getColorByName(tileMapValue) === color);
    }

    public clearPreviousPossibleMoves(newPossibleMoves: Tile[]) {
        if (this.currentPossibleMoves) {
            this.previousPossibleMoves = this.currentPossibleMoves;
            this.previousPossibleMoves.forEach((tile) => {
                if (tile) tile.setAsNormal();
            });
        }
        this.currentPossibleMoves = newPossibleMoves;
    }

    public removePiecefromGame({ tileX, tileY }: TilePositionInterface) {
        this.pieces[tileY][tileX] = null;
        this.pieceMap[tileY][tileX] = '  ';
    }

    public undo() {
        const currentBoard = gameHistory.getPreviousInteraction();
        this.updateDrawMap(currentBoard);
    }

    public redo() {
        const currentBoard = gameHistory.getNextInteraction();
        this.updateDrawMap(currentBoard);
    }

    private updateDrawMap(currentBoard) {
        if (currentBoard) {
            this.pieceMap = _.cloneDeep(currentBoard);
            this.drawBoard();
        }
    }

    public isCheck(tiles:Tile[]): Tile[] {
        const kingTile = this.findKing();
        const pieceCheck = this.isKingExposed(kingTile);
        if (pieceCheck) {
            const movementTiles = pieceCheck.piece.movementTileExposingKing(kingTile);
            let finalResult = [];
            finalResult = this.checkIfCanSacrifice(tiles, movementTiles);
            if (finalResult.length <= 0) {
                finalResult = this.checkIfCanFlee(tiles, kingTile);
                console.log(finalResult)
            }
            return finalResult;
        }
        return tiles;
    }

    private findKing(): Tile {
        const pieceName = player.isMyTurn() ? 'wk' : 'bk';
        let kingTile;

        for (let i = 0; i < consts.BOARD_SIZE; i++) {
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            this.pieceMap[i].forEach((element, index) => {
                if (element === pieceName) {
                    kingTile = this.getTiles({
                        tileX: index,
                        tileY: i
                    });
                }
            });
            if (kingTile) return kingTile;
        }
        return null;
    }

    // eslint-disable-next-line class-methods-use-this
    private isKingExposed(kingTile: Tile): { piece:Piece, tiles:Tile[] } | null {
        const allPiecesAllMoves = player.isMyTurn() ? enemy.myPossibleMoves() : player.myPossibleMoves();
        let pieceCheck = null;
        allPiecesAllMoves.forEach((pieceAndTile, index) => {
            const found = pieceAndTile.tiles.find((elem) => elem.tilePosition.tileX === kingTile.tilePosition.tileX && elem.tilePosition.tileY === kingTile.tilePosition.tileY);
            if (found) {
                pieceCheck = allPiecesAllMoves[index];
            }
        });
        return pieceCheck;
    }

    // eslint-disable-next-line class-methods-use-this
    private checkIfCanSacrifice(tiles:Tile[], movementTiles:Tile[]):Tile[] {
        const finalResult = [];
        if (movementTiles) {
            tiles.forEach((pieceTiles) => {
                const result = movementTiles.filter((currentTile) => currentTile.tilePosition.tileX === pieceTiles.tilePosition.tileX && currentTile.tilePosition.tileY === pieceTiles.tilePosition.tileY);
                if (result.length > 0) {
                    result.forEach((elem) => finalResult.push(elem));
                } 
            });
        }
        return finalResult;
    }

    private checkIfCanFlee(tiles:Tile[], kingTile:Tile):Tile[] {
        const king = this.getPieceOnTile(kingTile.tilePosition) as King;
        const allPossibleKingTiles = king.showPossibleMoves(false);

        const allPiecesAllMoves = player.isMyTurn() ? enemy.myPossibleMoves() : player.myPossibleMoves();

        allPossibleKingTiles.forEach((kingPossibleTile, index) => {
            allPiecesAllMoves.forEach((pieceAndTile) => {
                const found = pieceAndTile.tiles.find((elem) => elem.tilePosition.tileX === kingPossibleTile.tilePosition.tileX && elem.tilePosition.tileY === kingPossibleTile.tilePosition.tileY);
                if (found) allPossibleKingTiles.splice(index, 1);
            });
        });

        return allPossibleKingTiles;
    }

    private checkIfCanEat() {
        
    }
}

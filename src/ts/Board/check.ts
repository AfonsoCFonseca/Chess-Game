import Tile from './Tile';
import { board, enemy, player, checkText } from '../App';
import Piece from '../Pieces/Piece';
import * as consts from '../Utils/consts';
import King from '../Pieces/King';

export default (tiles:Tile[]): Tile[] => {
    const kingTile = findKing();
    const pieceCheck = isKingExposed(kingTile);
    const movementTiles = [];
    if (pieceCheck.length > 0) {
        checkText.setVisible(true);
        pieceCheck.forEach((pieceAndTile) => movementTiles.push(pieceAndTile.piece.movementTileExposingKing(kingTile)));
        const canSacrificeResult = checkIfCanSacrifice(tiles, movementTiles, kingTile);
        const canFleeResult = checkIfCanFlee(tiles, kingTile);
        const fleeAndSacrificeResult = canSacrificeResult.concat(canFleeResult);
        const canEatResult = checkIfCanEat(tiles, pieceCheck);
        const finalResult = fleeAndSacrificeResult.concat(canEatResult);

        return finalResult;
    } 
    if (!pieceCheck && board.currentTile === kingTile) {
        return checkIfKingCanEat(tiles);
    }

    return tiles;
};

const findKing = (): Tile => {
    const pieceName = player.isMyTurn() ? 'wk' : 'bk';
    let kingTile;

    for (let i = 0; i < consts.BOARD_SIZE; i++) {
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        board.pieceMap[i].forEach((element, index) => {
            if (element === pieceName) {
                kingTile = board.getTiles({
                    tileX: index,
                    tileY: i
                });
            }
        });
        if (kingTile) return kingTile;
    }
    return null;
};

// eslint-disable-next-line class-methods-use-this
const isKingExposed = (kingTile: Tile): { piece:Piece, tiles:Tile[] }[] | null => {
    const allPiecesAllMoves = player.isMyTurn() ? enemy.myPossibleMoves() : player.myPossibleMoves();
    const pieceCheck = [];
    allPiecesAllMoves.forEach((pieceAndTile, index) => {
        const found = pieceAndTile.tiles.find((elem) => elem.tilePosition.tileX === kingTile.tilePosition.tileX && elem.tilePosition.tileY === kingTile.tilePosition.tileY);
        if (found) {
            pieceCheck.push(allPiecesAllMoves[index]);
        }
    });
    return pieceCheck;
};

// eslint-disable-next-line class-methods-use-this
const checkIfCanSacrifice = (tiles:Tile[], movementTiles:Tile[][], kingTile: Tile):Tile[] => {
    if (movementTiles.length !== 1 || board.currentTile === kingTile) return [];
    const finalResult = [];
    tiles.forEach((pieceTiles) => {
        const result = movementTiles[0].filter((currentTile) => currentTile.tilePosition.tileX === pieceTiles.tilePosition.tileX && currentTile.tilePosition.tileY === pieceTiles.tilePosition.tileY);
        console.log(result)
        if (result.length > 0) {
            result.forEach((elem) => finalResult.push(elem));
        } 
    });
    return finalResult;
};

const checkIfCanFlee = (tiles:Tile[], kingTile:Tile):Tile[] => {
    if (board.currentTile !== kingTile) return [];
    const king = board.getPieceOnTile(kingTile.tilePosition) as King;
    const allPossibleKingTiles = king.showPossibleMoves(false);
    const previousKingTiles = [];
    const newPossibleTiles = [];

    allPossibleKingTiles.forEach((tile) => {
        const { tileX, tileY } = tile.tilePosition;
        previousKingTiles.push(board.getPieceOnTile(tile.tilePosition));
        board.pieces[tileY][tileX] = board.getPieceOnTile(kingTile.tilePosition);
    });

    const allPiecesAllMoves = player.isMyTurn() ? enemy.myPossibleMoves() : player.myPossibleMoves();

    allPossibleKingTiles.forEach((kingPossibleTile, index) => {
        let isFound = false;
        allPiecesAllMoves.forEach((pieceAndTile) => {
            const found = pieceAndTile.tiles.filter((elem) => elem.tilePosition.tileX === kingPossibleTile.tilePosition.tileX && elem.tilePosition.tileY === kingPossibleTile.tilePosition.tileY);
            if (found.length >= 1) {
                isFound = true;
            }
        });
        if (!isFound) {
            newPossibleTiles.push(kingPossibleTile);
        }
    });

    allPossibleKingTiles.forEach((tile, i) => {
        const { tileX, tileY } = tile.tilePosition;
        board.pieces[tileY][tileX] = previousKingTiles[i];
    });

    return newPossibleTiles;
};

// eslint-disable-next-line class-methods-use-this
const checkIfKingCanEat = (kingMoves: Tile[]) => {
    const remainingTiles = [];
    const previousKingTiles = [];
    
    kingMoves.forEach((tile) => {
        const { tileX, tileY } = tile.tilePosition;
        previousKingTiles.push(board.getPieceOnTile(tile.tilePosition));
        board.pieces[tileY][tileX] = board.getPieceOnTile(board.currentTile.tilePosition);
    });

    const allPiecesAllMoves = player.isMyTurn() ? enemy.myPossibleMoves() : player.myPossibleMoves();

    kingMoves.forEach((kingTile) => {
        let isFound = false;
        allPiecesAllMoves.forEach((pieceAndTile) => {
            const found = pieceAndTile.tiles.filter((tile) => kingTile.tilePosition.tileX === tile.tilePosition.tileX && kingTile.tilePosition.tileY === tile.tilePosition.tileY)
            if (found.length >= 1) {
                isFound = true;
            }
        });
        if (!isFound) {
            remainingTiles.push(kingTile);
        }
    });

    kingMoves.forEach((tile, i) => {
        const { tileX, tileY } = tile.tilePosition;
        board.pieces[tileY][tileX] = previousKingTiles[i];
    });

    return remainingTiles;
};

const checkIfCanEat = (tiles:Tile[], pieceCheck: any):Tile[] => {
    if (pieceCheck.length !== 1) return [];
    const { piece } = pieceCheck[0];
    const found = tiles.find((tile) => tile.tilePosition.tileX === piece.currentTile.tileX && tile.tilePosition.tileY === piece.currentTile.tileY )
    if (found) return [found];
    return [];
};

import { PiecesColors, PiecesType, TilePositionInterface } from '../game.interfaces';
import Piece from './Piece';
import * as utils from '../Utils/utils';
import { board } from '../App';
import Tile from '../Board/Tile';
import { BOARD_SIZE } from '../Utils/consts';

export default class Queen extends Piece {
    constructor(tilePos: TilePositionInterface, color: PiecesColors) {
        const { positionX, positionY } = utils.converToPositionSize(tilePos);
        const imageName = `${color === PiecesColors.WHITE ? 'white' : 'black'}Queen`;
        super({ positionX, positionY }, color, PiecesType.QUEEN, imageName);
    }

    public showPossibleMoves(isKingCheck?): Tile[] {
        const finalLeftPossibleTiles = this.getDiagonalMoves('left', 'up').concat(this.getDiagonalMoves('left', 'down'));
        const finalRightPossibleTiles = this.getDiagonalMoves('right', 'up').concat(this.getDiagonalMoves('right', 'down'));
        const finalPossibleTilesDiagonal = finalLeftPossibleTiles.concat(finalRightPossibleTiles);

        const possibleY = this.getSideMoves('y', 'left-up').concat(this.getSideMoves('y', 'right-down'));
        const possibleX = this.getSideMoves('x', 'right-down').concat(this.getSideMoves('x', 'left-up'));
        const finalPossibleTilesSide = possibleX.concat(possibleY);

        const finalPossibleTiles = finalPossibleTilesSide.concat(finalPossibleTilesDiagonal);
        return super.showPossibleMoves(finalPossibleTiles, isKingCheck);
    }

    private getDiagonalMoves(side: string, direction: string): Tile[] {
        const possibleArrMoves = [];
        const currentTile = { 
            tileX: this.currentTile.tileX + (side === 'left' ? -1 : 1),
            tileY: this.currentTile.tileY + (direction === 'up' ? -1 : 1)
        };

        let piece = board.getPieceOnTile(currentTile);
        while ((!piece || piece.color !== this.color) && utils.isInsideBoardDiagonal(currentTile)) {
            const tile = board.getTiles(currentTile);
            if (!piece || (piece && piece.color !== this.color)) possibleArrMoves.push(tile);
            if (piece) break;

            currentTile.tileX += (side === 'left' ? -1 : 1);
            currentTile.tileY += (direction === 'up' ? -1 : 1);
            piece = board.getPieceOnTile(currentTile);
        }
        
        return possibleArrMoves;
    }

    private getSideMoves(axis: string, dir: string): Tile[] {
        const possibleArrMoves = [];
        const incr = dir === 'left-up' ? -1 : 1;
        let counter = axis === 'x' ? this.currentTile.tileX + incr : this.currentTile.tileY + incr;
        const currentTile = axis === 'x' ? { tileX: counter, tileY: this.currentTile.tileY } : { tileX: this.currentTile.tileX, tileY: counter };
        let piece = board.getPieceOnTile(currentTile);

        while ((!piece || piece.color !== this.color) && utils.isInsideBoardDiagonal(currentTile)) {
            const tile = board.getTiles(currentTile);
            if (!piece || (piece && piece.color !== this.color)) possibleArrMoves.push(tile);
            if (piece) break;
            counter += incr;
            if (axis === 'x') currentTile.tileX = counter;
            else currentTile.tileY = counter;
            piece = board.getPieceOnTile(currentTile);
        }

        return possibleArrMoves;
    }

    public movementTileExposingKing(kingTile:Tile): Tile[] {
        const axis = ['x', 'y'];
        const side = ['left', 'right'];
        let dir = ['left-up', 'right-down'];

        for (let i = 0; i < axis.length; i++) {
            for (let j = 0; j < dir.length; j++) {
                const currentMovementTile = this.getSideMoves(axis[i], dir[j]);
                if (utils.checkForTileInTileArray(kingTile, currentMovementTile)) {
                    return currentMovementTile;
                }
            }
        }
        
        dir = ['up', 'down'];

        for (let i = 0; i < side.length; i++) {
            for (let j = 0; j < dir.length; j++) {
                const currentMovementTile = this.getDiagonalMoves(side[i], dir[j]);
                if (utils.checkForTileInTileArray(kingTile, currentMovementTile)) {
                    return currentMovementTile;
                }
            }
        }

        return null;
    }
}

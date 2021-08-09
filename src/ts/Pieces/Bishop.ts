import { PiecesColors, PiecesType, TilePositionInterface } from '../game.interfaces';
import Piece from './Piece';
import * as utils from '../Utils/utils';
import Tile from '../Board/Tile';
import { board } from '../App';

export default class Bishop extends Piece {
    constructor(tilePos: TilePositionInterface, color: PiecesColors) {
        const { positionX, positionY } = utils.converToPositionSize(tilePos);
        const imageName = `${color === PiecesColors.WHITE ? 'white' : 'black'}Bishop`;
        super({ positionX, positionY }, color, PiecesType.BISHOP, imageName);
    }

    public showPossibleMoves(isKingCheck?): Tile[] {
        const finalLeftPossibleTiles = this.getMoves('left', 'up').concat(this.getMoves('left', 'down'));
        const finalRightPossibleTiles = this.getMoves('right', 'up').concat(this.getMoves('right', 'down'));
        const finalPossibleTiles = finalLeftPossibleTiles.concat(finalRightPossibleTiles);
        return super.showPossibleMoves(finalPossibleTiles, isKingCheck);
    }

    private getMoves(side: string, direction: string): Tile[] {
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

    public movementTileExposingKing(kingTile:Tile): Tile[] {
        const side = ['left', 'right'];
        const dir = ['up', 'down'];

        for (let i = 0; i < side.length; i++) {
            for (let j = 0; j < dir.length; j++) {
                const currentMovementTile = this.getMoves(side[i], dir[j]);
                if (utils.checkForTileInTileArray(kingTile, currentMovementTile)) {
                    return currentMovementTile;
                }
            }
        }

        return null;
    }
}
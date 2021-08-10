import * as _ from 'lodash';
import { PiecesColors, PiecesType, TilePositionInterface } from '../game.interfaces';
import Piece from './Piece';
import * as utils from '../Utils/utils';
import { board } from '../App';
import Tile from '../Board/Tile';
import { BOARD_SIZE } from '../Utils/consts';

export default class Rook extends Piece {
    constructor(tilePos: TilePositionInterface, color: PiecesColors) {
        const { positionX, positionY } = utils.converToPositionSize(tilePos);
        const imageName = `${color === PiecesColors.WHITE ? 'white' : 'black'}Rook`;
        super({ positionX, positionY }, color, PiecesType.ROOK, imageName);
    }

    public showPossibleMoves(isKingCheck?): Tile[] {
        const possibleY = this.getMoves('y', 'left-up').concat(this.getMoves('y', 'right-down'));
        const possibleX = this.getMoves('x', 'right-down').concat(this.getMoves('x', 'left-up'));
        const finalPossibleTiles = possibleX.concat(possibleY);
        return super.showPossibleMoves(finalPossibleTiles, isKingCheck);
    }

    private getMoves(axis: string, dir: string): Tile[] {
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
        const dir = ['left-up', 'right-down'];

        for (let i = 0; i < axis.length; i++) {
            for (let j = 0; j < dir.length; j++) {
                const currentMovementTile = this.getMoves(axis[i], dir[j]);
                if (utils.checkForTileInTileArray(kingTile, currentMovementTile)) {
                    return currentMovementTile;
                }
            }
        }

        return null;
    }
}

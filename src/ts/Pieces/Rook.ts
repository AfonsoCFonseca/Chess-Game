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
        const possibleY = this.getMoves('y');
        const possibleX = this.getMoves('x');
        const finalPossibleTiles = possibleX.concat(possibleY);
        return super.showPossibleMoves(finalPossibleTiles, isKingCheck);
    }

    private getMoves(axis: 'x' | 'y'): Tile[] {
        const possibleArrMoves = [];
        const sides = ['left-up', 'right-down'];
        
        for (let i = 0; i < sides.length; i++) {
            const incr = sides[i] === 'left-up' ? -1 : 1;
            let counter = axis === 'x' ? this.currentTile.tileX + incr : this.currentTile.tileY + incr;
            const currentTile = axis === 'x' ? { tileX: counter, tileY: this.currentTile.tileY } : { tileX: this.currentTile.tileX, tileY: counter };
            let piece = board.getPieceOnTile(currentTile);

            while ((!piece || piece.color !== this.color) && sides[i] === 'left-up' ? counter >= 0 : counter < BOARD_SIZE) {
                const tile = board.getTiles(currentTile);
                if (!piece || (piece && piece.color !== this.color)) possibleArrMoves.push(tile);
                if (piece) break;
                counter += incr;
                if (axis === 'x') currentTile.tileX = counter;
                else currentTile.tileY = counter;
                piece = board.getPieceOnTile(currentTile);
            }
        }
        return possibleArrMoves;
    }

    public movementTileExposingKing(kingTile:Tile): Tile[]{
        return [kingTile];
    }
}

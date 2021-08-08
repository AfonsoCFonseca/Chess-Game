import { PiecesColors, PiecesType, TilePositionInterface } from '../game.interfaces';
import * as _ from 'lodash';
import Piece from './Piece';
import * as utils from '../Utils/utils';
import { board } from '../App';
import Tile from '../Board/Tile';
import { BOARD_SIZE } from '../Utils/consts';

export default class King extends Piece {
    constructor(tilePos: TilePositionInterface, color: PiecesColors) {
        const { positionX, positionY } = utils.converToPositionSize(tilePos);
        const imageName = `${color === PiecesColors.WHITE ? 'white' : 'black'}King`;
        super({ positionX, positionY }, color, PiecesType.KING, imageName);
    }

    public showPossibleMoves(isKingCheck?): Tile[] {
        const possibleLeft = this.getDiagonalMoves('left');
        const possibleRight = this.getDiagonalMoves('right');
        const finalPossibleTilesDiagonal = possibleLeft.concat(possibleRight);

        const possibleX = this.getSideMoves('x');
        const possibleY = this.getSideMoves('y');

        const finalPossibleTilesSide = possibleX.concat(possibleY);
        const finalPossibleTiles = finalPossibleTilesDiagonal.concat(finalPossibleTilesSide); 
        return super.showPossibleMoves(finalPossibleTiles, isKingCheck);
    }

    private getDiagonalMoves(type: 'left' | 'right'): Tile[] {
        const possibleArrMoves = [];
        const direction = ['down', 'up'];

        for (let i = 0; i < direction.length; i++) {
            const currentTile = { 
                tileX: this.currentTile.tileX + (type === 'left' ? -1 : 1),
                tileY: this.currentTile.tileY + (direction[i] === 'up' ? -1 : 1)
            };

            const piece = board.getPieceOnTile(currentTile);
            if ((!piece || piece.color !== this.color) && utils.isInsideBoardDiagonal(currentTile)) {
                const tile = board.getTiles(currentTile);
                possibleArrMoves.push(tile);
            }
        }
        return possibleArrMoves;
    }

    private getSideMoves(axis: 'x' | 'y'): Tile[] {
        const possibleArrMoves = [];
        const sides = ['left-up', 'right-down'];
        
        for (let i = 0; i < sides.length; i++) {
            const incr = sides[i] === 'left-up' ? -1 : 1;
            const counter = axis === 'x' ? this.currentTile.tileX + incr : this.currentTile.tileY + incr;
            const currentTile = axis === 'x' ? { tileX: counter, tileY: this.currentTile.tileY } : { tileX: this.currentTile.tileX, tileY: counter };
            const piece = board.getPieceOnTile(currentTile);

            if ((!piece || piece.color !== this.color) && sides[i] === 'left-up' ? counter >= 0 : counter < BOARD_SIZE) {
                const tile = board.getTiles(currentTile);
                possibleArrMoves.push(tile);
                //if (piece) break;
            }
        }
        return possibleArrMoves;
    }

    public movementTileExposingKing(kingTile:Tile): Tile[]{
        return [kingTile];
    }
}

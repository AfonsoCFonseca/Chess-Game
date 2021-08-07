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

    public showPossibleMoves(): Tile[] {
        const possibleLeft = this.getDiagonalMoves('left');
        const possibleRight = this.getDiagonalMoves('right');
        const finalPossibleTilesDiagonal = possibleLeft.concat(possibleRight);

        const possibleX = this.getSideMoves('x');
        const possibleY = this.getSideMoves('y');
        const finalPossibleTilesSide = possibleX.concat(possibleY);

        const finalPossibleTiles = finalPossibleTilesSide.concat(finalPossibleTilesDiagonal);
        return super.showPossibleMoves(finalPossibleTiles);
    }

    private getDiagonalMoves(type: 'left' | 'right'): Tile[] {
        const possibleArrMoves = [];
        const direction = ['down', 'up'];

        for (let i = 0; i < direction.length; i++) {
            const currentTile = { 
                tileX: this.currentTile.tileX + (type === 'left' ? -1 : 1),
                tileY: this.currentTile.tileY + (direction[i] === 'up' ? -1 : 1)
            };

            let piece = board.getPieceOnTile(currentTile);
            while ((!piece || piece.color !== this.color) && utils.isInsideBoardDiagonal(currentTile)) {
                const tile = board.getTiles(currentTile);
                if (!piece || (piece && piece.color !== this.color)) possibleArrMoves.push(tile);
                if (piece) break;

                currentTile.tileX += (type === 'left' ? -1 : 1);
                currentTile.tileY += (direction[i] === 'up' ? -1 : 1);
                piece = board.getPieceOnTile(currentTile);
            }
        }
        return possibleArrMoves;
    }

    private getSideMoves(axis: 'x' | 'y'): Tile[] {
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
}

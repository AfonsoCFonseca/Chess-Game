import { PiecesColors, PiecesType, TilePositionInterface } from '../game.interfaces';
import Piece from './Piece';
import * as utils from '../Utils/utils';
import Tile from '../Board/Tile';
import { board } from '../App';
import { BOARD_SIZE } from '../Utils/consts';

export default class Bishop extends Piece {
    constructor(tilePos: TilePositionInterface, color: PiecesColors) {
        const { positionX, positionY } = utils.converToPositionSize(tilePos);
        const imageName = `${color === PiecesColors.WHITE ? 'white' : 'black'}Bishop`;
        super({ positionX, positionY }, color, PiecesType.BISHOP, imageName);
    }

    public showPossibleMoves(): Tile[] {
        const possibleLeft = this.getMoves('left');
        const possibleRight = this.getMoves('right');
        const finalPossibleTiles = possibleLeft.concat(possibleRight);
        return super.showPossibleMoves(finalPossibleTiles);
    }

    private getMoves(type: 'left' | 'right'): Tile[] {
        const possibleArrMoves = [];
        const direction = ['down', 'up'];

        for (let i = 0; i < direction.length; i++) {
            const currentTile = { 
                tileX: this.currentTile.tileX + (type === 'left' ? -1 : 1),
                tileY: this.currentTile.tileY + (direction[i] === 'up' ? -1 : 1)
            };

            let piece = board.getPieceOnTile(currentTile);
            while ((!piece || piece.color !== this.color) && isInsideBoard(currentTile)) {
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
}

function isInsideBoard(currentTile): boolean {
    return (currentTile.tileX < BOARD_SIZE && currentTile.tileX >= 0) 
        && (currentTile.tileY < BOARD_SIZE && currentTile.tileY >= 0);
}
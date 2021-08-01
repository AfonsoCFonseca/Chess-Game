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

    public showPossibleMoves(): Tile[] {
        const possibleX = this.getMoves('x');
        const possibleY = this.getMoves('y');
        const finalPossibleTiles = possibleX.concat(possibleY);
        return super.showPossibleMoves(finalPossibleTiles);
    }

    private getMoves(axis: 'x' | 'y'): Tile[] {
        const possibleArrMoves = [];

        let counter = axis === 'x' ? this.currentTile.tileX - 1 : this.currentTile.tileY - 1;
        let currentTile = axis === 'x' ? { tileX: counter, tileY: this.currentTile.tileY } : { tileX: this.currentTile.tileX, tileY: counter }
        let piece = board.getPieceOnTile(currentTile);

        while ((!piece || piece.color !== this.color) && counter >= 0) {
            const tile = board.getTiles(currentTile);
            possibleArrMoves.push(tile);
            if (piece && piece.color !== this.color) break;
            counter -= 1;
            if (axis === 'x') currentTile.tileX = counter;
            else currentTile.tileY = counter;
            piece = board.getPieceOnTile(currentTile);
        }

        counter = axis === 'x' ? this.currentTile.tileX + 1 : this.currentTile.tileY + 1;
        currentTile = axis === 'x' ? { tileX: counter, tileY: this.currentTile.tileY } : { tileX: this.currentTile.tileX, tileY: counter };
        piece = board.getPieceOnTile(currentTile);

        while ((!piece || piece.color !== this.color) && counter <= BOARD_SIZE) {
            const tile = board.getTiles(currentTile);
            possibleArrMoves.push(tile);
            if (piece && piece.color !== this.color) break;
            counter += 1;
            if (axis === 'x') currentTile.tileX = counter;
            else currentTile.tileY = counter;
            piece = board.getPieceOnTile(currentTile);
        }
        return possibleArrMoves;
    }
}

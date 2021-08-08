import { PiecesColors, PiecesType, TilePositionInterface } from '../game.interfaces';
import Piece from './Piece';
import * as utils from '../Utils/utils';
import Tile from '../Board/Tile';
import { board } from '../App';

export default class Knight extends Piece {
    constructor(tilePos: TilePositionInterface, color: PiecesColors) {
        const { positionX, positionY } = utils.converToPositionSize(tilePos);
        const imageName = `${color === PiecesColors.WHITE ? 'white' : 'black'}Knight`;
        super({ positionX, positionY }, color, PiecesType.KNIGHT, imageName);
    }

    public showPossibleMoves(isKingCheck?): Tile[] {
        const possibleLeft = this.getMoves('left');
        const possibleRight = this.getMoves('right');
        const finalPossibleTiles = possibleLeft.concat(possibleRight);
        return super.showPossibleMoves(finalPossibleTiles, isKingCheck);
    }

    private getMoves( type: 'left'|'right'): Tile[] {
        const possibleArrMoves = [];
        const direction = ['down1', 'up1', 'down2', 'up2'];

        for (let i = 0; i < direction.length; i++) {
            const incrX = (direction[i] === 'up1' || direction[i] === 'down1') ? 2 : 1;
            const incrY = (direction[i] === 'up1' || direction[i] === 'down1') ? 1 : 2;

            const currentTile = { 
                tileX: this.currentTile.tileX + (type === 'left' ? -incrX : incrX),
                tileY: this.currentTile.tileY + (direction[i] === 'up1' || direction[i] === 'up2' ? -incrY : incrY)
            };

            let piece = board.getPieceOnTile(currentTile);
            if ((!piece || piece.color !== this.color) && utils.isInsideBoardDiagonal(currentTile)) {
                const tile = board.getTiles(currentTile);
                possibleArrMoves.push(tile);
            }
        }
        return possibleArrMoves;
    }

    public movementTileExposingKing(kingTile:Tile): Tile[]{
        return [kingTile];
    }
}

import { PiecesColors, PiecesType, TilePositionInterface } from '../game.interfaces'
import Piece from './Piece';
import * as utils from '../Utils/utils';
import { board, player } from '../App';
import Tile from '../Board/Tile';

export default class Pawn extends Piece {
    constructor(tilePos: TilePositionInterface, color: PiecesColors) {
        const { positionX, positionY } = utils.converToPositionSize(tilePos);
        const imageName = `${color === PiecesColors.WHITE ? 'white' : 'black'}Pawn`;
        super({ positionX, positionY }, color, PiecesType.PAWN, imageName);
    }

    public showPossibleMoves(isKingCheck?): Tile[] {
        let possibleTiles: Tile[] = [];
        possibleTiles = this.frontMoves(this.currentTile);
        const diagonalPossibleTiles = this.diagonalMoves(this.currentTile);
        const finalPossibleTiles = possibleTiles.concat(diagonalPossibleTiles);

        return super.showPossibleMoves(finalPossibleTiles, isKingCheck);
    }

    private frontMoves({ tileX, tileY }): Tile[] {
        let arrOfPossibleTiles: TilePositionInterface[] = [];
        let nextTileY = this.color === PiecesColors.BLACK ? tileY + 1 : tileY - 1;
        arrOfPossibleTiles.push({ tileX, tileY: nextTileY });

        if (this.firstTurn) {
            nextTileY = this.color === PiecesColors.BLACK ? ++nextTileY : --nextTileY;
            arrOfPossibleTiles.push({ tileX, tileY: nextTileY });
        }

        arrOfPossibleTiles = this.canFrontalMove(arrOfPossibleTiles);
        return board.getTiles(arrOfPossibleTiles) as Tile[];
    }

    private diagonalMoves({ tileX, tileY }): Tile[] {
        const arrOfPossibleTiles: TilePositionInterface[] = [];
        for (let i = 0; i < 2; i++) {
            const nextTileX = i === 0 ? tileX + 1 : tileX - 1;
            const nextTileY = tileY + (this.color === PiecesColors.BLACK ? +1 : -1);
            if (this.canDiagonalMove(nextTileX, nextTileY)) {
                arrOfPossibleTiles.push({ tileX: nextTileX, tileY: nextTileY });
            }
        }
        return board.getTiles(arrOfPossibleTiles) as Tile[];
    }

    // eslint-disable-next-line class-methods-use-this
    private canDiagonalMove(nextTileX: number, nextTileY: number): boolean {
        const piece = board.getPieceOnTile({ tileX: nextTileX, tileY: nextTileY });
        return piece && piece.color === (player.isMyTurn() ? PiecesColors.BLACK : PiecesColors.WHITE);
    }

    // eslint-disable-next-line class-methods-use-this
    private canFrontalMove(arrOfPossibleTiles: TilePositionInterface[]): TilePositionInterface[] {
        arrOfPossibleTiles.forEach(({ tileX, tileY }, index) => {
            const piece = board.getPieceOnTile({ tileX, tileY });
            if (piece) {
                if (index === 0) {
                    arrOfPossibleTiles = [];
                    return;
                } 
                arrOfPossibleTiles.splice(index, 1);
            }
        });
        return arrOfPossibleTiles;
    }

    public movementTileExposingKing(kingTile:Tile): Tile[]{
        return [kingTile];
    }
}

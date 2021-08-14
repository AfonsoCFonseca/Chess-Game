import Piece from './Pieces/Piece';
import * as utils from './Utils/utils';
import { board, scene } from './App';
import Tile from './Board/Tile';
import User from './User';

export default class Enemy extends User {
    constructor() {
        super(false);
    }

    public async turn() {
        let rndPieceNum: number;
        let rndPiece: Piece;
        let possibleMoves: Tile[];

        const eatingPieceAndTile = [];
        //Check if Can Eat
        this.myPieces.forEach((piece) => {
            const possibleMoves1 = piece.showPossibleMoves();
            possibleMoves1.forEach((move) => {
                if (board.getPieceOnTile(move.tilePosition)) {
                    eatingPieceAndTile.push({ piece, move });
                }
            });
        });

        do {
            const totalPiecesNum = eatingPieceAndTile.length > 0 ? eatingPieceAndTile.length : this.myPieces.length;
            rndPieceNum = Math.floor(utils.rndNumber(0, totalPiecesNum));
            rndPiece = eatingPieceAndTile.length > 0 ? eatingPieceAndTile[rndPieceNum].piece : this.myPieces[rndPieceNum];
            possibleMoves = rndPiece.showPossibleMoves();
        } while (!possibleMoves || possibleMoves.length <= 0 || possibleMoves[0] === undefined);
        const suggestedTileLength = possibleMoves.length;
        const numb = Math.floor(utils.rndNumber(0, suggestedTileLength));
        const suggestedTile = possibleMoves[numb];
        await eatingPieceAndTile.length > 0 ? rndPiece.to(suggestedTile) : this.myPieces[rndPieceNum].to(suggestedTile);
        scene.changeTurn();
    }

    private checkIfCanEat = (possibleMoves: Tile[]): Tile[] => {
        possibleMoves.forEach((move) => console.log(move));
        return possibleMoves;
    }
}

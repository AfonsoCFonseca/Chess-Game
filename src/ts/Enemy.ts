import Piece from './Pieces/Piece';
import * as utils from './Utils/utils';
import { scene } from './App';
import Tile from './Board/Tile';
import User from './User';

export default class Enemy extends User {
    constructor() {
        super(false);
    }

    public async turn() {
        const totalPiecesNum = this.myPieces.length;
        let rndPieceNum: number;
        let rndPiece: Piece;
        let possibleMoves: Tile[];

        do {
            rndPieceNum = Math.floor(utils.rndNumber(0, totalPiecesNum));
            rndPiece = this.myPieces[rndPieceNum];
            possibleMoves = rndPiece.showPossibleMoves();
        } while (!possibleMoves || possibleMoves.length <= 0 || possibleMoves[0] === undefined);
        const suggestedTileLength = possibleMoves.length;
        const numb = Math.floor(utils.rndNumber(0, suggestedTileLength));
        const suggestedTile = possibleMoves[numb];
        await this.myPieces[rndPieceNum].to(suggestedTile);
        scene.changeTurn();
    }
}

import Piece from './Pieces/Piece';
import * as utils from './Utils/utils';
import { board, scene } from './App';
import Tile from './Board/Tile';

export default class Enemy {
    public isTurn: boolean;
    public myPieces: Piece[] = [];

    constructor() {
        this.isTurn = false;
    }

    public setTurn(isTurn: boolean) {
        this.isTurn = isTurn;
    }

    public isMyTurn(): boolean {
        return this.isTurn;
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
        } while (!possibleMoves || possibleMoves.length <= 0);
        const suggestedTileLength = possibleMoves.length;
        const numb = Math.floor(utils.rndNumber(0, suggestedTileLength));
        const suggestedTile = possibleMoves[numb];
        await this.myPieces[rndPieceNum].to(suggestedTile);
        scene.changeTurn();
    }

    public removePieceFromArray(piece: Piece) {
        const index = this.myPieces.findIndex((element) => element.active === false);
        this.myPieces.splice(index, 1);
    }

    public resetPieceArray = () => {
        this.myPieces = [];
    };
}

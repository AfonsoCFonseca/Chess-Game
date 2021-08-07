import Tile from './Board/Tile';
import Piece from './Pieces/Piece';

export default abstract class User {
    public isTurn:boolean ;
    public myPieces: Piece[] = [];

    constructor(isTurn) {
        this.isTurn = isTurn;
    }

    public setTurn(isTurn: boolean) {
        this.isTurn = isTurn;
    }

    public isMyTurn():boolean {
        return this.isTurn;
    }

    public removePieceFromArray(piece: Piece) {
        const index = this.myPieces.findIndex((element) => !element || element.active === false);
        this.myPieces.splice(index, 1);
    }

    public resetPieceArray = () => {
        this.myPieces = [];
    };

    public myPossibleMoves = (): Tile[] => {
        const allTileMoves = [];
        console.log( this.myPieces )
        this.myPieces.forEach((piece) => {
            // if (piece) {
            //     allTileMoves.concat(piece.showPossibleMoves());
            // }
        });   

        return allTileMoves;
    };
}

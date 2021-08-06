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
}

import Tile from './Board/Tile';
import Bishop from './Pieces/Bishop';
import Piece from './Pieces/Piece';
import { castSpecificPiece } from './Utils/utils';

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

    public myPossibleMoves = (): { piece:Piece, tiles:Tile[] }[] => {
        const allPiecesAllMoves = [];

        this.myPieces.forEach((piece) => {
            const specficPiece = castSpecificPiece(piece);
            const allTileMoves = [];
            
            specficPiece.showPossibleMoves(false).forEach((elem) => {
                allTileMoves.push(elem);
            });
            allPiecesAllMoves.push({ 
                piece, 
                tiles: allTileMoves
            });
        });

        return allPiecesAllMoves;
    };
}

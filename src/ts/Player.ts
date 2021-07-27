import { board } from "./App"
import { Piece } from "./Pieces/Piece"

export class Player {

    public isTurn:boolean 
    public myPieces: Piece[] = []

    constructor(){
        this.isTurn = true
    }

    public setTurn( isTurn: boolean ){
        this.isTurn = isTurn
    }

    public isMyTurn():boolean{
        return this.isTurn
    }

    public removePieceFromArray( piece: Piece ){

    }
}
import { textSpanOverlapsWith, updateCommaList } from "typescript"
import { Piece } from "./Pieces/Piece"
import * as utils from "./Utils/utils"
import { board, scene } from "./App"
import { Tile } from "./Board/Tile"

export class Enemy {

    public isTurn:boolean 
    public myPieces: Piece[] = []

    constructor(){
        this.isTurn = false
    }

    public setTurn( isTurn: boolean ){
        this.isTurn = isTurn
    }

    public isMyTurn():boolean{
        return this.isTurn
    }

    public turn(){
        let totalPiecesNum = this.myPieces.length
        let rndPieceNum:number;
        let rndPiece: Piece
        let possibleMoves: Tile[]
        do{
            rndPieceNum = Math.floor( utils.rndNumber( 0, totalPiecesNum ) )
            rndPiece = this.myPieces[rndPieceNum]
            possibleMoves = rndPiece.showPossibleMoves()
        }while( !possibleMoves || possibleMoves.length <= 0 )
        let suggestedTileLength = possibleMoves.length;
        let numb = Math.floor( utils.rndNumber(0, suggestedTileLength))
        let suggestedTile = possibleMoves[ numb ]
        this.myPieces[rndPieceNum].to(suggestedTile)
        scene.changeTurn()
    }

    public removePieceFromArray( piece: Piece ){

    }   
}
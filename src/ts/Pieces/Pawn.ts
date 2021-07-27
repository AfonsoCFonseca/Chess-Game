import { piecesColors, piecesType, TilePositionInterface } from '../game.interfaces'
import { Piece } from './Piece';
import * as utils from "../Utils/utils";
import { board, player, scene } from "../App";
import { Tile } from '../Board/Tile';

export class Pawn extends Piece {

    constructor( tilePos: TilePositionInterface, color: piecesColors ){
        let { positionX, positionY } = utils.converToPositionSize( tilePos )
        let imageName = `${color == piecesColors.WHITE ? 'white' : 'black' }Pawn`
        super( { positionX, positionY }, color, piecesType.PAWN, imageName )
    }

    public showPossibleMoves(): Tile[]{
        let possibleTiles: Tile[] = []

        possibleTiles = this.frontMoves(this.currentTile)
        let diagonalPossibleTiles = this.diagonalMoves(this.currentTile) 
        let finalPossibleTiles = possibleTiles.concat( diagonalPossibleTiles )

        return super.showPossibleMoves( finalPossibleTiles )

    }

    private frontMoves({ tileX, tileY } ):Tile[]{
        let arrOfPossibleTiles:TilePositionInterface[] = []
        let nextTileY = this.color == piecesColors.BLACK ? tileY + 1: tileY - 1
        arrOfPossibleTiles.push( { tileX: tileX, tileY: nextTileY } )
        if( this.firstTurn ){
            nextTileY = this.color == piecesColors.BLACK ? ++nextTileY : --nextTileY
            arrOfPossibleTiles.push( { tileX: tileX, tileY: nextTileY } )
        }

        if( this.canFrontalMove( arrOfPossibleTiles ) )
            return board.getTiles( arrOfPossibleTiles )
        else return []
    }

    private diagonalMoves( { tileX, tileY }):Tile[]{
        let arrOfPossibleTiles:TilePositionInterface[] = []
        for( var i = 0; i < 2; i++ ){
            let nextTileX = i == 0 ? tileX + 1 : tileX - 1;
            let nextTileY = tileY + ( this.color == piecesColors.BLACK ? +1 : -1 )
            if( this.canDiagonalMove( nextTileX, nextTileY ) )
                arrOfPossibleTiles.push( { tileX: nextTileX, tileY: nextTileY } )
        }
        return board.getTiles( arrOfPossibleTiles )
    }

    private canDiagonalMove(nextTileX:number, nextTileY:number):boolean{
        let piece = board.getPieceOnTile( { tileX: nextTileX, tileY: nextTileY } )
        return piece && piece.color == ( player.isMyTurn() ? piecesColors.BLACK : piecesColors.WHITE )
    }

    private canFrontalMove( arrOfPossibleTiles: TilePositionInterface[] ):boolean{
        let canMove = true;
        arrOfPossibleTiles.forEach( ({tileX, tileY}) => {
            let piece = board.getPieceOnTile( { tileX, tileY } )
            if( piece ) canMove = false
        })
        return canMove
    }
}
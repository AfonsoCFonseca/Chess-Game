import * as consts from "../Utils/consts"
import * as utils from "../Utils/utils"
import { Pawn } from '../Pieces/Pawn'
import { Queen } from '../Pieces/Queen'
import { King } from '../Pieces/King'
import { Rook } from '../Pieces/Rook'
import { Bishop } from '../Pieces/Bishop'
import { Knight } from '../Pieces/Knight'
import { Piece } from '../Pieces/Piece'
import { Tile } from '../Board/Tile'
import { piecesColors, piecesType, TilePositionInterface } from "../game.interfaces"
import { player, enemy, debugText, gameHistory } from "../App";


export class Board {

    public pieces: Piece[][] = [[]]
    public tiles: Tile[][] = [[]]
    public currentTile: Tile;
    public previousTile: Tile = null

    public currentPossibleMoves: Tile[] = []
    public previousPossibleMoves: Tile[] = null

    public selectedPiece: Piece = null

    public pieceMap = [  
                                ["br","bn","bb","bq","bk","bb","bn","br"],
                                ["bp","bp","bp","bp","bp","bp","bp","bp"],
                                ["  ","  ","  ","  ","  ","  ","  ","  "],
                                ["  ","  ","  ","  ","  ","  ","  ","  "],
                                ["  ","  ","  ","  ","  ","  ","  ","  "],
                                ["  ","  ","  ","  ","  ","  ","  ","  "],
                                ["wp","wp","wp","wp","wp","wp","wp","wp"],
                                ["wr","wn","wb","wq","wk","wb","wn","wr"],
                        ]

    constructor(){
        this.drawBoard()
    }

    private drawBoard():void{
        for( var i = 0; i < consts.BOARD_SIZE; i++ ){
            this.tiles[i] = []
            for( var j = 0; j < consts.BOARD_SIZE; j++ ){
                let positionY:number = (i * consts.TILE_SIZE ) + utils.getHalfScreenHeight()
                let positionX:number = (j * consts.TILE_SIZE) + utils.getHalfScreenWidth()
                let tileName:string = utils.getNameOfTile( {tileX:i, tileY:j} )

                this.tiles[i].push( new Tile( { positionX, positionY }, tileName ) )
            }
        }

        this.drawPieces()
    }

    private drawPieces():void{
        for( var i = 0; i < this.pieceMap.length;i++ ){
            this.pieces[i] = []
            for( var j = 0; j < this.pieceMap[i].length; j++ ){
                let color = utils.getColorByName( this.pieceMap[i][j] )
                let newPiece = this.newPiece( i,j , color )
                this.pieces[i].push( newPiece )
                if( color == piecesColors.BLACK ) enemy.myPieces.push( newPiece )
                else player.myPieces.push( newPiece )
            }
        }

        debugText.setText( this.pieceMap )
    }

    private newPiece( i: number, j: number, color:piecesColors ): Piece{
        let tilePos = { tileX:j, tileY:i }
        let abbr = this.pieceMap[i][j]
        switch( utils.getTypeByName(abbr) ){
            case piecesType.ROOK:
                return new Rook( tilePos,color )
            case piecesType.PAWN:
                return new Pawn( tilePos,color )
            case piecesType.KNIGHT:
                return new Knight( tilePos,color )
            case piecesType.QUEEN:
                return new Queen( tilePos,color )
            case piecesType.KING:
                return new King( tilePos,color )
            case piecesType.BISHOP:
                return new Bishop( tilePos,color )
            default:
                return null
        }

    }

    public updateMap( previousTile: TilePositionInterface, newPos:TilePositionInterface, piece: Piece ){
        let { tileX, tileY } = previousTile
        this.pieces[tileY][tileX] = null;
        this.pieceMap[tileY][tileX] = "  ";

        let existantPiece = this.getPieceOnTile( {tileY: newPos.tileY, tileX: newPos.tileX} )
        if( existantPiece ) piece.eat( existantPiece )

        this.pieces[newPos.tileY][newPos.tileX] = piece;
        this.pieceMap[newPos.tileY][newPos.tileX] = `${player.isMyTurn() ? "w":"b"}${piece.type}`;
        
        debugText.setText( this.pieceMap )
        gameHistory.saveInteraction(this.pieceMap)
    }

    public setCurrentTile(current:Tile):Tile{
        if( current && this.currentTile ){
            this.previousTile = this.currentTile
            this.previousTile.setAsNormal()
        } 
        this.currentTile = current
        this.currentTile.setAsSelected()
        return this.currentTile
    }

    public getPieceOnTile( {tileX, tileY}:TilePositionInterface):Piece | null{
        return this.pieces[tileY][tileX]
    }

    public getTiles( tilePos: TilePositionInterface[] ): Tile[]{
        let tiles: Tile[] = []
        tilePos.map( (tile,i) => {
            let { tileY, tileX } = tile
            tiles.push( this.tiles[tileY][tileX])
        })

        return tiles
    }

    public isTileFree( tile: Tile ):boolean{
        let { tileX, tileY } = tile.tilePosition
        let tileMapValue = this.pieceMap[tileY][tileX]
        let color = player.isMyTurn() ? piecesColors.BLACK : piecesColors.WHITE
        if( tileMapValue == "  " || utils.getColorByName( tileMapValue ) == color )
            return true
        else return false

    }

    public clearPreviousPossibleMoves( newPossibleMoves: Tile[] ){

        if( this.currentPossibleMoves ){
            this.previousPossibleMoves = this.currentPossibleMoves
            this.previousPossibleMoves.map( tile => {
                if(tile) tile.setAsNormal() 
            })
        }
        this.currentPossibleMoves = newPossibleMoves
    }

    public removePiecefromGame( {tileX, tileY }:TilePositionInterface ){
        this.pieces[tileY][tileX] = null;
        this.pieceMap[tileY][tileX] = "  "
    }

    public undo() {
        const currentBoard = gameHistory.getPreviousInteraction()
        console.log(currentBoard)
        this.pieceMap = currentBoard;
        this.drawBoard()
    }

    public redo() {
        gameHistory.getNextInteraction()
    }

}
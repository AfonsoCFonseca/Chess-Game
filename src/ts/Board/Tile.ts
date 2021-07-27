import { TilePositionInterface, PositionInterface } from '../game.interfaces'
import * as utils from '../Utils/utils'
import { scene, board, player } from "../App";
import { Piece } from '../Pieces/Piece';

export class Tile {

    public tilePosition: TilePositionInterface
    public position: PositionInterface
    private tileImg;
    private possibleTileImg;

    constructor( position: PositionInterface, tileName:string){
        this.position = position
        this.tilePosition = utils.converToTileSize( position )

        this.tileImg = scene.add.image(position.positionX, position.positionY, tileName);
        this.tileImg.setInteractive( { useHandCursor: true  } );
        this.tileImg.on('pointerdown', () =>{
            
            if( player.isMyTurn() ){
                let piece = this.getPieceOnTile()
                if( piece && piece.isPlayerPiece() ){
                    board.setCurrentTile( this )
                    board.selectedPiece = piece;
                    piece.showPossibleMoves()
                }
            }
    
        } )

        this.possibleTileImg = scene.add.image(position.positionX, position.positionY, "bubble")
        this.possibleTileImg.visible = false;
        this.possibleTileImg.setInteractive( { useHandCursor: true  } );
        this.possibleTileImg.on('pointerdown', () =>{
            
            if( this.possibleTileImg.visible ){
                board.selectedPiece.to( this )
                board.currentTile.setAsNormal()
                board.clearPreviousPossibleMoves(null)
                scene.changeTurn()
            }
    
        } )
    }

    public getPieceOnTile(): Piece | null{
        return board.getPieceOnTile( this.tilePosition )
    }

    public setAsSelected(){
        this.tileImg.setTexture('grayTile')
    }

    public setAsNormal(){
        this.possibleTileImg.visible = false;
        let tileName = utils.getNameOfTile( this.tilePosition )
        this.tileImg.setTexture(tileName)
    }

    public setAsPossibleMove(){
        this.possibleTileImg.visible = true;
    }
}
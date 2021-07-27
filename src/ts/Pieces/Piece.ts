import { board, enemy, player, scene } from '../App';
import { Tile } from '../Board/Tile';
import { PieceInterface, TilePositionInterface,piecesColors, piecesType, PositionInterface } from '../game.interfaces'
import * as utils from "../Utils/utils";


export class Piece extends Phaser.GameObjects.Sprite implements PieceInterface {

    protected currentTile: TilePositionInterface
    public color: piecesColors
    public type: piecesType
    public firstTurn = true
    
    constructor(  { positionX, positionY }:PositionInterface, color: piecesColors, type: piecesType, imageName:string){
        super( scene, positionX, positionY, imageName, 0 );
        scene.add.existing(this)
        scene.physics.world.enable(this);
        
        this.currentTile = utils.converToTileSize({ positionX, positionY })
        this.color = color
        this.type = type
    }

    protected getTile(){
        return this.currentTile;
    }

    public isPlayerPiece():boolean{
        if( this.color == piecesColors.BLACK ) return false
        else return true
    }
    
    public showPossibleMoves( tiles:Tile[] | void ): Tile[]{

        if( player.isMyTurn() ){ //Drawer

            board.clearPreviousPossibleMoves( tiles as Tile[] )
            board.currentPossibleMoves.forEach( (tile, index, object) => {
                if( tile ) {
                    if( board.isTileFree( tile ) )
                        tile.setAsPossibleMove() 
                    else object.splice(index, 1);                
                }
            })
        }

        return tiles as Tile[]
    }

    public to( newTile: Tile ){
        this.firstTurn = false;
        let previousTile = this.currentTile
        this.currentTile = newTile.tilePosition;
        board.updateMap( previousTile, this.currentTile, this )
        this.x = newTile.position.positionX
        this.y = newTile.position.positionY
    }


    public eat( piece: Piece ){
        board.removePiecefromGame( piece.getTile() )
        if( piece.color == piecesColors.BLACK ) enemy.removePieceFromArray( piece ) 
        else player.removePieceFromArray( piece ) 
        piece.destroy()
    }

}

//return Car.prototype.carBoundary.call( this, this.direction, this.currentTilePosition  )
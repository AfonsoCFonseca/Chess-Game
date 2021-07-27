import { TilePositionInterface, PositionInterface, piecesColors, piecesType } from '../game.interfaces' 
import * as consts from '../Utils/consts' 

export function converToTileSize({positionX, positionY}: PositionInterface):TilePositionInterface{
    let tileX = positionX - getHalfScreenWidth()
    tileX /= consts.TILE_SIZE
    let tileY = positionY - getHalfScreenHeight()
    tileY /= consts.TILE_SIZE

    return {
        tileX,
        tileY
    }
}

export function converToPositionSize({tileX, tileY}: TilePositionInterface):PositionInterface{

    let positionX = tileX * consts.TILE_SIZE
    positionX += getHalfScreenWidth()

    let positionY = tileY * consts.TILE_SIZE
    positionY += getHalfScreenHeight()
    return {
        positionX,
        positionY
    }
}

export function getHalfScreenWidth():number{
    return consts.CANVAS.WIDTH / 2 - consts.BACKGROUND_WIDHT / 2
}

export function getHalfScreenHeight():number{
    return consts.CANVAS.HEIGHT / 2  - consts.BACKGROUND_HEIGHT / 2
}

export function getColorByName(name: string):piecesColors{
    if( name[0] == "b" ) return piecesColors.BLACK
    else return piecesColors.WHITE
}

export function getTypeByName(name: string):piecesType{
    switch( name[1] ){
        case "r":
            return piecesType.ROOK
        case "p":
            return piecesType.PAWN
        case "n":
            return piecesType.KNIGHT
        case "q":
            return piecesType.QUEEN
        case "k":
            return piecesType.KING
        case "b":
            return piecesType.BISHOP
        default:
            return null
    }
}

export function getNameOfTile( { tileX, tileY }:TilePositionInterface ):string{

    if( tileX % 2 == 0 && tileY % 2 == 0 ||
        tileX % 2 != 0 && tileY % 2 != 0 ) return "whiteTile"
    else return "blackTile"
    
}

export function rndNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}
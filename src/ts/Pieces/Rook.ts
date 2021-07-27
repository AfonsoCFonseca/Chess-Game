import { piecesColors, piecesType, TilePositionInterface } from '../game.interfaces'
import { Piece } from './Piece';
import * as utils from "../Utils/utils";
import { scene } from "../App";

export class Rook extends Piece {

    constructor( tilePos: TilePositionInterface, color: piecesColors ){
        let { positionX, positionY } = utils.converToPositionSize( tilePos )
        let imageName = `${color == piecesColors.WHITE ? 'white' : 'black' }Rook`
        super( { positionX, positionY }, color, piecesType.ROOK, imageName )
    }


}
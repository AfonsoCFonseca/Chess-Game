import { scene } from '../App';
import { TilePositionInterface, PositionInterface, PiecesColors, PiecesType } from '../game.interfaces';
import Bishop from '../Pieces/Bishop';
import King from '../Pieces/King';
import Knight from '../Pieces/Knight';
import Pawn from '../Pieces/Pawn';
import Piece from '../Pieces/Piece';
import Queen from '../Pieces/Queen';
import Rook from '../Pieces/Rook';
import * as consts from './consts';

export function converToTileSize({ positionX, positionY }: PositionInterface):TilePositionInterface {
    let tileX = positionX - getHalfScreenWidth();
    tileX /= consts.TILE_SIZE;
    let tileY = positionY - getHalfScreenHeight();
    tileY /= consts.TILE_SIZE;

    return {
        tileX,
        tileY
    };
}

export function converToPositionSize({ tileX, tileY }: TilePositionInterface):PositionInterface {
    let positionX = tileX * consts.TILE_SIZE;
    positionX += getHalfScreenWidth();

    let positionY = tileY * consts.TILE_SIZE;
    positionY += getHalfScreenHeight();
    
    return {
        positionX,
        positionY
    };
}

export function getHalfScreenWidth():number {
    return consts.CANVAS.WIDTH / 2 - consts.BACKGROUND_WIDHT / 2;
}

export function getHalfScreenHeight():number {
    return consts.CANVAS.HEIGHT / 2 - consts.BACKGROUND_HEIGHT / 2;
}

export function getColorByName(name: string):PiecesColors {
    if (name[0] === 'b') return PiecesColors.BLACK;
    return PiecesColors.WHITE;
}

export function getTypeByName(name: string):PiecesType {
    switch (name[1]) {
        case 'r':
            return PiecesType.ROOK;
        case 'p':
            return PiecesType.PAWN;
        case 'n':
            return PiecesType.KNIGHT;
        case 'q':
            return PiecesType.QUEEN;
        case 'k':
            return PiecesType.KING;
        case 'b':
            return PiecesType.BISHOP;
        default:
            return null;
    }
}

export function castSpecificPiece(piece: Piece): Rook | Pawn | Knight | Queen | King | Bishop {
    switch (piece.type) {
        case 'r':
            return piece as Rook;
        case 'p':
            return piece as Pawn;
        case 'n':
            return piece as Knight;
        case 'q':
            return piece as Queen;
        case 'k':
            return piece as King;
        case 'b':
            return piece as Bishop;
        default:
            return null;
    }
}

export function getNameOfTile({ tileX, tileY }:TilePositionInterface):string {
    if ((tileX % 2 === 0 && tileY % 2 === 0) 
        || (tileX % 2 !== 0 && tileY % 2 !== 0)) {
        return 'whiteTile';
    }
    return 'blackTile';
}

export function rndNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export const makeAnimation = (target, { x, y }, duration) => new Promise<void>((resolve) => {
    scene.tweens.add({
        targets: target,
        x,
        y,
        ease: 'Linear',     
        duration,
        repeat: 0,
        onComplete() {
            resolve();
        }
    });
});

export const isInsideBoardDiagonal = (currentTile): boolean => (currentTile.tileX < consts.BOARD_SIZE && currentTile.tileX >= 0) 
        && (currentTile.tileY < consts.BOARD_SIZE && currentTile.tileY >= 0);
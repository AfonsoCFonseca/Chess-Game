export interface PieceInterface {

}

export interface TilePositionInterface {
    tileX: number,
    tileY: number,
}

export interface PositionInterface {
    positionX: number,
    positionY: number,
}

export enum PiecesColors {
    BLACK = 'black',
    WHITE = 'white'
}

export enum PiecesType {
    PAWN = 'p',
    ROOK = 'r',
    KNIGHT = 'n',
    BISHOP = 'b',
    KING = 'k',
    QUEEN = 'q'
}

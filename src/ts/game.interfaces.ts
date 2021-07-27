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

export enum piecesColors {
    BLACK = "black",
    WHITE = "white"
}


export enum piecesType {
    PAWN = "p",
    ROOK = "r",
    KNIGHT = "n",
    BISHOP = "b",
    KING = "k",
    QUEEN = "q"
}


import {
    board, enemy, player, scene
} from '../App';
import Tile from '../Board/Tile';
import {
    PieceInterface, TilePositionInterface, PiecesColors, PiecesType, PositionInterface
} from '../game.interfaces';
import * as utils from '../Utils/utils';

export default class Piece extends Phaser.GameObjects.Sprite implements PieceInterface {
    protected currentTile: TilePositionInterface;
    public color: PiecesColors;
    public type: PiecesType;
    public firstTurn = true;

    constructor({ positionX, positionY }: PositionInterface, color: PiecesColors, type: PiecesType, imageName: string) {
        super(scene, positionX, positionY, imageName, 0);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.currentTile = utils.converToTileSize({ positionX, positionY });
        this.color = color;
        this.type = type;
    }

    protected getTile() {
        return this.currentTile;
    }

    public isPlayerPiece(): boolean {
        if (this.color === PiecesColors.BLACK) return false;
        return true;
    }

    // eslint-disable-next-line class-methods-use-this
    public showPossibleMoves(tiles: Tile[] | void): Tile[] {
        if (player.isMyTurn()) { //Drawer
            board.clearPreviousPossibleMoves(tiles as Tile[]);
            board.currentPossibleMoves.forEach((tile, index, object) => {
                if (tile) {
                    if (board.isTileFree(tile)) { tile.setAsPossibleMove(); } else object.splice(index, 1);
                }
            });
        }

        return tiles as Tile[];
    }

    public to(newTile: Tile) {
        this.firstTurn = false;
        const previousTile = this.currentTile;
        this.currentTile = newTile.tilePosition;
        board.updateMap(previousTile, this.currentTile, this);
        this.x = newTile.position.positionX;
        this.y = newTile.position.positionY;
    }

    // eslint-disable-next-line class-methods-use-this
    public eat(piece: Piece) {
        board.removePiecefromGame(piece.getTile());
        if (piece.color === PiecesColors.BLACK) enemy.removePieceFromArray(piece);
        else player.removePieceFromArray(piece);
        piece.destroy();
    }
}

//return Car.prototype.carBoundary.call( this, this.direction, this.currentTilePosition  )
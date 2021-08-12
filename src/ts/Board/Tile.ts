import { TilePositionInterface, PositionInterface } from '../game.interfaces';
import * as utils from '../Utils/utils';
import { 
    scene, board, player, gameHistory, checkText 
} from '../App';
import Piece from '../Pieces/Piece';

export default class Tile {
    public tilePosition: TilePositionInterface;
    public position: PositionInterface;
    private tileImg;
    private possibleTileImg;

    constructor(position: PositionInterface, tileName:string) {
        this.position = position;
        this.tilePosition = utils.converToTileSize(position);

        this.tileImg = scene.add.image(position.positionX, position.positionY, tileName);
        this.tileImg.setInteractive({ useHandCursor: true });
        this.tileImg.on('pointerdown', () => {
            if (player.isMyTurn() && gameHistory.isActualTurn()) {
                const piece = this.getPieceOnTile();
                if (piece && piece.isPlayerPiece()) {
                    board.setCurrentTile(this);
                    board.selectedPiece = piece;
                    piece.showPossibleMoves();
                }
            }
        });

        this.possibleTileImg = scene.add.image(position.positionX, position.positionY, 'bubble');
        this.possibleTileImg.visible = false;
        this.possibleTileImg.setInteractive({ useHandCursor: true });
        this.possibleTileImg.on('pointerdown', async () => {
            if (this.possibleTileImg.visible) {
                checkText.setVisible(false);
                await board.selectedPiece.to(this);
                board.currentTile.setAsNormal();
                board.clearPreviousPossibleMoves(null);
                scene.changeTurn();
            }
        });
    }

    public getPieceOnTile(): Piece | null {
        return board.getPieceOnTile(this.tilePosition);
    }

    public setAsSelected() {
        this.tileImg.setTexture('grayTile');
    }

    public setAsNormal() {
        this.possibleTileImg.visible = false;
        const tileName = utils.getNameOfTile(this.tilePosition);
        this.tileImg.setTexture(tileName);
    }

    public setAsPossibleMove() {
        this.possibleTileImg.visible = true;
    }

    public destroyTile() {
        this.tileImg.destroy();
        this.possibleTileImg.destroy();
    }
}

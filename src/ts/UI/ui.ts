import { scene, board, checkText } from '../App';

export default function drawUi() {
    turnButtons();

}

function turnButtons() {
    const redoBtn = scene.add.image(200, 900, 'redoBtn').setDepth(1).setOrigin(0, 0);
    redoBtn.setInteractive({ useHandCursor: true });
    redoBtn.on('pointerup', () => board.redo());

    const undoBtn = scene.add.image(125, 900, 'undoBtn').setDepth(1).setOrigin(0, 0);
    undoBtn.setInteractive({ useHandCursor: true });
    undoBtn.on('pointerup', () => board.undo());
}
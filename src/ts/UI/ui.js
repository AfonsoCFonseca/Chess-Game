"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("../App");
function drawUi() {
    turnButtons();
}
exports.drawUi = drawUi;
function turnButtons() {
    var redoBtn = App_1.scene.add.image(200, 900, 'redoBtn').setDepth(1).setOrigin(0, 0);
    redoBtn.setInteractive({ useHandCursor: true });
    redoBtn.on('pointerup', function () { return App_1.board.redo(); });
    var undoBtn = App_1.scene.add.image(125, 900, 'undoBtn').setDepth(1).setOrigin(0, 0);
    undoBtn.setInteractive({ useHandCursor: true });
    undoBtn.on('pointerup', function () { return App_1.board.undo(); });
}

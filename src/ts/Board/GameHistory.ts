import * as _ from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export class GameHistory {
    private history = [];
    private currentTurn = 0;
    private presentTurn = 0;

    constructor(pieceMap: string[][]) {
        this.history.push(_.cloneDeep(pieceMap));
    }

    saveInteraction(newTurnMap: string[][]) {
        this.currentTurn += 1;
        this.presentTurn += 1;
        const newArray = _.cloneDeep(newTurnMap);
        this.history.push(newArray);
    }

    setToActualTurn(): number {
        this.currentTurn = this.presentTurn;
        return this.presentTurn;
    }

    isActualTurn(): boolean {
        return this.currentTurn === this.presentTurn;
    }

    getPreviousInteraction():string[][] { 
        const previousTurn = this.currentTurn - 1;

        if (this.history[previousTurn]) {
            this.currentTurn -= 1;
            return this.history[previousTurn];
        }

        return null;
    }

    getNextInteraction():string[][] {
        const nextTurn = this.currentTurn + 1;

        if (this.history[nextTurn]) {
            this.currentTurn += 1;
            return this.history[nextTurn];
        }
        return null;
    }
}

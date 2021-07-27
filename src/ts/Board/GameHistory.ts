import * as _ from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export class GameHistory {
    private history = [];
    private currentTurn = 1;
    private actualTurn = 1;
    
    constructor(pieceMap: string[][]) {
        this.history.push(_.cloneDeep(pieceMap));
    }

    saveInteraction(newTurnMap: string[][]) {
        this.currentTurn += 1;
        this.actualTurn += 1;
        const newArray = _.cloneDeep(newTurnMap);
        this.history.push(newArray);
    }

    getInteraction() {

    }

    setToActualTurn(): number {
        this.currentTurn = this.actualTurn;
        return this.currentTurn;
    }

    isActualTurn(): boolean {
        return this.currentTurn === this.actualTurn;
    }

    getPreviousInteraction() { 
        const previousTurn = this.currentTurn - 1;
        
        if (this.history[previousTurn - 1]) {
            this.currentTurn -= 1;
            return this.history[previousTurn - 1];
        }
        return this.history[this.currentTurn - 1];
    }

    getNextInteraction() {
        console.log('NEXT');
    }
}

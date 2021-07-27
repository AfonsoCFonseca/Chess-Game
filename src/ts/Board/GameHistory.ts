import { board } from '../App'
import * as _ from 'lodash'

export class GameHistory {

    private history = [];
    private currentTurn = 1;
    
    constructor(){
        this.history.push(_.cloneDeep(board.pieceMap));
    }

    saveInteraction(newTurnMap) {
        this.currentTurn++;
        let newArray = _.cloneDeep(newTurnMap)
        this.history.push(newArray)
    }

    getInteraction() {

    }

    getPreviousInteraction() { 
        const previousTurn = this.currentTurn-2
        console.log(previousTurn)
        
        if (this.history[previousTurn]) {
            return this.history[previousTurn]
        }
        return this.history[this.currentTurn];
    }

    getNextInteraction() {
        console.log("NEXT")
    }
}
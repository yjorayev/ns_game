import { BoardState, Location } from "./Board";

export class BoardStateTransitionManager{
    private possibleMoves: IMove[];
    private possibleSwaps: IMove[];

    public getMovesFor(location: Location, boardState: BoardState): IMove[]{
        let standard = this.getStandardMoves(location, boardState);
        let swap = this.getSwapMoves(location, boardState);
        let moves = standard.concat(swap);
        return moves;
    }

    private getStandardMoves(location: Location, boardState: BoardState): IMove[]{
        let moves = [];
        
    }

    private getSwapMoves(location: Location, boardState: BoardState): IMove[]{
        
    }

    private getMovesByDirection(location: Location, direction: Direction, boardState: BoardState): IMove[]{
    }
}

export class StandardMove implements IMove{
    move(from: Location, to: Location, boardState: BoardState): BoardState {
        let figure = boardState.values[from.row][from.column];
        boardState = figure.move(from, to, boardState);

        return boardState;
    }
} 

export class SwapMove implements IMove{
    move(from: Location, to: Location, boardState: BoardState): BoardState {
        let figure = boardState.values[from.row][from.column];
        boardState = figure.swap(from, to, boardState);

        return boardState;
    }
}

export interface IMove{
    move(from: Location, to: Location, boardState: BoardState): BoardState;
}

enum Direction{
    UP,
    RIGHT,
    DOWN,
    LEFT
}

class Step{
    private direction: Direction;
    private stepLength: number;
}
import { BoardState } from "./Board";
import { Location } from "./Location";
import { MoveDescriptor, StandardMoveDescriptor, SwapMoveDescriptor } from "./Move";
import { IFigure } from "./Figures/IFigure.interface";

export class BoardStateTransitionManager {
  private directions: StepDescriptor[] = [
    new StepDescriptor(-1, 0), //UP
    new StepDescriptor(0, 1), //RIGHT
    new StepDescriptor(1, 0), //DOWN
    new StepDescriptor(0, -1) //LEFT
  ];

  public getMovesFor(
    location: Location,
    figure: IFigure,
    boardState: BoardState
  ): MoveDescriptor[] {
    let moves: MoveDescriptor[] = [];
    for(let dir of this.directions){
        moves.push(...this.getMovesByDirection(location, dir, figure, boardState));
    }
    return moves;
  }

  private getMovesByDirection(
    location: Location,
    direction: StepDescriptor,
    figure: IFigure,
    boardState: BoardState
  ): MoveDescriptor[] {
    let moves = [];
    let newLocation = location.shift(direction);
    let newFigure = boardState.getFigure(newLocation);

    while (boardState.isLocationOnBoard(newLocation)) {
        if(newFigure.isLandable){
            moves.push(new StandardMoveDescriptor(location, newLocation, figure));
        }

        if(newFigure.isSwappable){
            moves.push(new SwapMoveDescriptor(location, newLocation, figure));
        }

        if(newFigure.isJumpable){
        newLocation = location.shift(direction);
        newFigure = boardState.getFigure(newLocation);
        } else{
            break;
        }
    }
    return moves;
  }
}

export class StepDescriptor {
  rowPush: number;
  columnPush: number;

  constructor(row: number, column: number) {
    this.rowPush = row;
    this.columnPush = column;
  }
}

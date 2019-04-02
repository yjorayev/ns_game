import { BoardState } from "./Board";
import { Location } from './Location';
import { IFigure } from "./Figures/IFigure.interface";

export abstract class MoveDescriptor {
    private from: Location;
    private to: Location;
    // private targetFigure: IFigure;
    private moveAction: (
      from: Location,
      to: Location,
      boardState: BoardState
    ) => BoardState;
  
    constructor(
      _from: Location,
      _to: Location,
      // _targetFigure: IFigure,
      _moveAction: (
        from: Location,
        to: Location,
        boardState: BoardState
      ) => BoardState
    ) {
      this.from = _from;
      this.to = _to;
      // this.targetFigure = _targetFigure;
      this.moveAction = _moveAction;
    }
  
    move(from: Location, to: Location, boardState: BoardState): BoardState {
      let figure = boardState.getFigure(from);
      boardState = this.moveAction(from, to, boardState);
      return boardState;
    }
  }
  
  export class StandardMoveDescriptor extends MoveDescriptor {
    constructor(from: Location, to: Location, targetFigure: IFigure) {
      super(from, to, targetFigure.move);
    }
  }
  
  export class SwapMoveDescriptor extends MoveDescriptor {
    constructor(from: Location, to: Location, targetFigure: IFigure) {
      super(from, to, targetFigure.swap);
    }
  }
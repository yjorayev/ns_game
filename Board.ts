import { Location } from "./Location";

export class Board {
  
  public state: BoardState;
}

export class BoardState {
  private rows: number;
  private columns: number;

  public values: IFigure[][];
  public isComplete: boolean;

  public getFigure(location: Location): IFigure{
    return this.values[location.row][location.column];
  }

  public isLocationOnBoard(location: Location): boolean{
    throw new Error("Method not implemented.");
  }
}

export interface IFrog extends IFigure {}

export interface IObstacle extends IFigure {}

export interface IFigure {
  isLandable: boolean;
  isSwappable: boolean;
  isJumpable: boolean;

  getPossibleMoves(): Location[];
  move(from: Location, target: Location, boardState: BoardState): BoardState;
  swap(from: Location, target: Location, boardState: BoardState): BoardState;
}

export class Frog implements IFigure {
  isSwappable: boolean;
  isLandable: boolean;
  isJumpable: boolean;

  constructor(_isStatic: boolean) {
    this.isStatic = _isStatic;
    this.isLandable = true;
  }

  isStatic: boolean;
  getPossibleMoves(): Location[] {
    throw new Error("Method not implemented.");
  }

  move(from: Location, to: Location, boardState: BoardState): BoardState {
    if (boardState.possibleMoves.includes(to)) {
      boardState.values[from.row][from.column] = new NullFigure();
      boardState.values[to.row][to.column] = new Frog(true);

      boardState = this.afterMove(to, boardState);

      return boardState;
    }
  }

  swap(from: Location, to: Location, boardState: BoardState): BoardState {
    if (boardState.possibleSwaps.includes(to)) {
      boardState.values[from.row][from.column] = new Frog(false);
      boardState.values[to.row][to.column] = new Frog(true);

      boardState = this.afterMove(from, boardState);
      boardState = this.afterMove(to, boardState);

      return boardState;
    }
  }

  private afterMove(location: Location, boardState: BoardState): BoardState {
    throw new Error("Method not implemented.");
  }
}

export class Obstacle implements IFigure {
  isJumpable: boolean;
  isSwappable: boolean;
  isLandable: boolean;
  location: Location;

  getPossibleMoves(): Location[] {
    return [];
  }

  move(from: Location, to: Location, boardState: BoardState) {
    return boardState;
  }

  swap(from: Location, target: Location, boardState: BoardState): BoardState {
    return boardState;
  }
}

export class NullFigure implements IFigure {
  isJumpable: boolean;
  isSwappable: boolean;
  isLandable: boolean;
  location: Location;

  getPossibleMoves(): Location[] {
    return [];
  }

  move(from: Location, to: Location, boardState: BoardState) {
    return boardState;
  }

  swap(from: Location, target: Location, boardState: BoardState): BoardState {
    return boardState;
  }
}
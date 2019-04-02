export class Board {
  private rows: number;
  private columns: number;
  public state: BoardState;
}

export class BoardState {
  public values: IFigure[][];
  public isComplete: boolean;
}

export interface IFrog extends IFigure {}

export interface IObstacle extends IFigure {}

export interface IFigure {
  getPossibleMoves(): Location[];
  move(from: Location, target: Location, boardState: BoardState): BoardState;
  swap(from: Location, target: Location, boardState: BoardState): BoardState;
}

export class Frog implements IFigure {
  constructor(_isStatic: boolean) {
    this.isStatic = _isStatic;
  }

  isStatic: boolean;
  getPossibleMoves(): Location[] {
    throw new Error("Method not implemented.");
  }

  move(from: Location, to: Location, boardState: BoardState): BoardState {
    if (boardState.possibleMoves.includes(to)) {
      boardState[from.row][from.column] = new NullFigure();
      boardState[to.row][to.column] = new Frog(true);

      boardState = this.afterMove(to, boardState);

      return boardState;
    }
  }

  swap(from: Location, to: Location, boardState: BoardState): BoardState {
    if (boardState.possibleSwaps.includes(to)) {
      boardState[from.row][from.column] = new Frog(false);
      boardState[to.row][to.column] = new Frog(true);

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

// export enum Figures{
//     FROG,
//     BARRIER,
//     EMPTY
// }

export class Location {
  row: number;
  column: number;
}

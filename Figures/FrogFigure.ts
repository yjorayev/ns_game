import { IFigure } from "./IFigure.interface";
import { BoardState } from "../Board";
import { Location } from "../Location";
import { NullFigure } from "./NullFigure";

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
      boardState.setFigure(from, new NullFigure());
      boardState.setFigure(to, new Frog(true));
  
      boardState = this.afterMove(to, boardState);
  
      return boardState;
    }
  
    swap(from: Location, to: Location, boardState: BoardState): BoardState {
      boardState.setFigure(from, new Frog(false));
      boardState.setFigure(to, new Frog(true));
  
      boardState = this.afterMove(from, boardState);
      boardState = this.afterMove(to, boardState);
  
      return boardState;
    }
  
    private afterMove(location: Location, boardState: BoardState): BoardState {
      throw new Error("Method not implemented.");
    }
  }
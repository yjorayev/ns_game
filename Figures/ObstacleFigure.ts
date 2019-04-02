import { IFigure } from "./IFigure.interface";
import { BoardState } from "../Board";
import { Location } from "../Location";

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
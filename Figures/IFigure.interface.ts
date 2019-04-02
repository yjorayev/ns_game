import { BoardState } from "../Board";
import { Location } from "../Location";

export interface IFigure {
    isLandable: boolean;
    isSwappable: boolean;
    isJumpable: boolean;
  
    getPossibleMoves(): Location[];
    move(from: Location, target: Location, boardState: BoardState): BoardState;
    swap(from: Location, target: Location, boardState: BoardState): BoardState;
  }
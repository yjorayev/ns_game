import { BoardState } from '../../../../Helpers/Board';
import { Location } from '../classes/Location';

export interface IFigure {
    isLandable: boolean;
    isSwappable: boolean;
    isJumpable: boolean;

    getPossibleMoves(): Location[];
    move(from: Location, target: Location, boardState: BoardState): BoardState;
    swap(from: Location, target: Location, boardState: BoardState): BoardState;
  }

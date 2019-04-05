import { BoardState } from '../../../../Helpers/Board';
import { Location } from '../classes/Location';
import { IFigure } from 'src/app/common/interfaces/IFigure.interface';

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

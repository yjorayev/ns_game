import { Location } from '../classes/Location';
import { IFigure } from 'src/app/common/interfaces/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { JumpDescriptor } from '../classes/JumpDescriptor';
import { BoardState } from '../classes/BoardState';

export class NullFigure implements IFigure {
  type: FigureType;
  color: Color;
  isJumpable: boolean;
  isSwappable: boolean;
  isLandable: boolean;
  location: Location;

  constructor() {
    this.type = FigureType.NULL;
    this.color = Color.NULL;
  }

  getPossibleMoves(): Location[] {
    return [];
  }

  move(from: Location, to: Location, boardState: BoardState) {
    return boardState;
  }

  swap(from: Location, target: Location, boardState: BoardState): BoardState {
    return boardState;
  }

  jump(jump: JumpDescriptor, boardState: BoardState): JumpDescriptor {
    const loc = jump.location.shift(jump.currentDirection);
    const figure = boardState.getFigure(loc);

    if (figure.isLandable) {
      return new JumpDescriptor(loc, jump.canChangeDirection, jump.currentDirection);
    }

    return null;
  }
}

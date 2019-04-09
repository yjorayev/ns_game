import { Location } from '../classes/Location';
import { IFigure } from 'src/app/common/interfaces/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { StepDescriptor } from '../classes/JumpDescriptor';
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
    this.isJumpable = false;
    this.isSwappable = false;
    this.isLandable = true;
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

  jump(jump: StepDescriptor, boardState: BoardState): StepDescriptor {
    throw new Error('Should not be jumping over empty cell cause it is landable');
  }
}

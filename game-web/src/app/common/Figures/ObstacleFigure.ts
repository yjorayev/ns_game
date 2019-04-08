import { Location } from '../classes/Location';
import { IFigure } from 'src/app/common/interfaces/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { JumpDescriptor } from '../classes/JumpDescriptor';
import { BoardState } from '../classes/BoardState';

export class Obstacle implements IFigure {
  type: FigureType;
  color: Color;
  isJumpable: boolean;
  isSwappable: boolean;
  isLandable: boolean;
  location: Location;

  constructor(color: Color) {
    this.type = FigureType.OBSTACLE;
    this.color = color;
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
    return null;
  }
}

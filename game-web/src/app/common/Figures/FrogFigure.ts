import { Location } from '../classes/Location';
import { NullFigure } from './NullFigure';
import { IFigure } from 'src/app/common/interfaces/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { StepDescriptor } from '../classes/JumpDescriptor';
import { BoardState } from '../classes/BoardState';

export class Frog implements IFigure {
  type: FigureType;
  color: Color;
  isSwappable: boolean;
  isLandable: boolean;
  isJumpable: boolean;

  constructor(isStatic: boolean, color: Color) {
    this.type = FigureType.FROG;
    this.isStatic = isStatic;
    this.isLandable = false;
    this.isJumpable = false;
    this.isSwappable = true;
    this.color = color;
  }

  isStatic: boolean;
  getPossibleMoves(): Location[] {
    throw new Error('Method not implemented.');
  }

  move(from: Location, to: Location, boardState: BoardState): BoardState {
    boardState.setFigure(from, new NullFigure());
    boardState.setFigure(to, new Frog(true, this.color));

    boardState = this.afterMove(to, boardState);

    return boardState;
  }

  swap(from: Location, to: Location, boardState: BoardState): BoardState {
    const fromColor = this.color;
    const toColor = boardState.getFigure(to).color;

    boardState.setFigure(from, new Frog(false, toColor));
    boardState.setFigure(to, new Frog(true, fromColor));

    boardState = this.afterMove(from, boardState);
    boardState = this.afterMove(to, boardState);

    return boardState;
  }

  jump(jump: StepDescriptor, boardState: BoardState): StepDescriptor {
    throw new Error('should not be jumping over Frog');
  }

  private afterMove(location: Location, boardState: BoardState): BoardState {
    throw new Error('Method not implemented.');
  }
}

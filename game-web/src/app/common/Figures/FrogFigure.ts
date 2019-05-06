import { Location } from '../classes/Location';
import { IFigure } from 'src/app/common/interfaces/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { StepDescriptor } from '../classes/StepDescriptor';
import { BoardState } from '../classes/BoardState';

export abstract class Frog implements IFigure {
  type: FigureType;
  color: Color;

  constructor(color: Color) {
    this.type = FigureType.FROG;
    this.color = color;
  }

  abstract land(step: StepDescriptor, boardState: BoardState): StepDescriptor;

  // move(from: Location, to: Location, boardState: BoardState): BoardState {
  //   boardState.setFigure(from, new NullFigure());
  //   boardState.setFigure(to, new Frog(true, this.color));

  //   boardState = this.afterMove(to, boardState);

  //   return boardState;
  // }

  // swap(from: Location, to: Location, boardState: BoardState): BoardState {
  //   const fromColor = this.color;
  //   const toColor = boardState.getFigure(to).color;

  //   boardState.setFigure(from, new Frog(false, toColor));
  //   boardState.setFigure(to, new Frog(true, fromColor));

  //   boardState = this.afterMove(from, boardState);
  //   boardState = this.afterMove(to, boardState);

  //   return boardState;
  // }

  private afterMove(location: Location, boardState: BoardState): BoardState {
    throw new Error('Method not implemented.');
  }
}

import { FigureType as FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { BoardState } from '../classes/BoardState';
import { Location } from '../classes/Location';
import { StepDescriptor } from '../classes/StepDescriptor';

export interface IFigure {
  type: FigureType;
  color: Color;
  // isLandable: boolean;
  // isSwappable: boolean;
  // isJumpable: boolean;

  land(step: StepDescriptor, boardState: BoardState): StepDescriptor;
}

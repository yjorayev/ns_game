import { Location } from '../classes/Location';
import { FigureType as FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { StepDescriptor } from '../classes/JumpDescriptor';
import { BoardState } from '../classes/BoardState';

export interface IFigure {
  type: FigureType;
  color: Color;
  isLandable: boolean;
  isSwappable: boolean;
  isJumpable: boolean;

  getPossibleMoves(): Location[];
  move(from: Location, target: Location, boardState: BoardState): BoardState;
  swap(from: Location, target: Location, boardState: BoardState): BoardState;
  jump(step: StepDescriptor, boardState: BoardState): StepDescriptor;
}

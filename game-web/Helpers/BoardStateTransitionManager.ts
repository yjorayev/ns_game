import { CellLocation } from '../src/app/common/classes/Location';
import { MoveDescriptor } from './Move';
import { IFigure } from 'src/app/common/interfaces/IFigure.interface';
import { DirectionDescriptor } from 'src/app/common/classes/DirectionDescriptor';
import { BoardState } from 'src/app/common/classes/BoardState';

export class BoardStateTransitionManager {
  private directions: DirectionDescriptor[] = [
    new DirectionDescriptor(-1, 0), // UP
    new DirectionDescriptor(0, 1), // RIGHT
    new DirectionDescriptor(1, 0), // DOWN
    new DirectionDescriptor(0, -1) // LEFT
  ];

  public getMovesFor(
    location: CellLocation,
    figure: IFigure,
    boardState: BoardState
  ): MoveDescriptor[] {
    const moves: MoveDescriptor[] = [];
    for (const dir of this.directions) {
        moves.push(...this.getMovesByDirection(location, dir, figure, boardState));
    }
    return moves;
  }

  private getMovesByDirection(
    location: CellLocation,
    direction: DirectionDescriptor,
    figure: IFigure,
    boardState: BoardState
  ): MoveDescriptor[] {
    const moves = [];
    // let newLocation = location.shift(direction);
    // let newFigure = boardState.getFigure(newLocation);

    // while (boardState.isLocationValid(newLocation)) {
    //     if (newFigure.isLandable) {
    //         moves.push(new StandardMoveDescriptor(location, newLocation, figure));
    //     }

    //     if (newFigure.isSwappable) {
    //         moves.push(new SwapMoveDescriptor(location, newLocation, figure));
    //     }

    //     if (newFigure.isJumpable) {
    //     newLocation = location.shift(direction);
    //     newFigure = boardState.getFigure(newLocation);
    //     } else {
    //         break;
    //     }
    // }
    return moves;
  }
}



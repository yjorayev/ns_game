import { BoardStateOld } from './Board';
import { CellLocation } from '../src/app/common/classes/Location';

export abstract class MoveDescriptor {
    // private targetFigure: IFigure;
    private moveAction: (
      from: CellLocation,
      to: CellLocation,
      boardState: BoardStateOld
    ) => BoardStateOld;

    constructor(
      _from: CellLocation,
      _to: CellLocation,
      // _targetFigure: IFigure,
      _moveAction: (
        from: CellLocation,
        to: CellLocation,
        boardState: BoardStateOld
      ) => BoardStateOld
    ) {
      // this.targetFigure = _targetFigure;
      this.moveAction = _moveAction;
    }

    move(from: CellLocation, to: CellLocation, boardState: BoardStateOld): BoardStateOld {
      boardState = this.moveAction(from, to, boardState);
      return boardState;
    }
  }



  // console.log('adding location: ', step.location.row, step.location.column);
  // console.log(
  //   'adding path: ',
  //   path.from.row,
  //   path.from.column,
  //   path.to.row,
  //   path.to.column,
  //   path.midPoint
  // );

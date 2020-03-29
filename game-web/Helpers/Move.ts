import { BoardStateOld } from './Board';
import { ICellLocation } from 'src/app/common/location/ICellLocation.interface';

export abstract class MoveDescriptor {
    // private targetFigure: IFigure;
    private moveAction: (
      from: ICellLocation,
      to: ICellLocation,
      boardState: BoardStateOld
    ) => BoardStateOld;

    constructor(
      _from: ICellLocation,
      _to: ICellLocation,
      // _targetFigure: IFigure,
      _moveAction: (
        from: ICellLocation,
        to: ICellLocation,
        boardState: BoardStateOld
      ) => BoardStateOld
    ) {
      // this.targetFigure = _targetFigure;
      this.moveAction = _moveAction;
    }

    move(from: ICellLocation, to: ICellLocation, boardState: BoardStateOld): BoardStateOld {
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

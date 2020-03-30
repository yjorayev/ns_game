import { ICellLocation } from '../location/ICellLocation.interface';
import { Path } from '../path/path';
import { Board } from './Board';

export interface IBoardState {
    updateState(location: ICellLocation): IBoardState;
    getPath(toLocation: ICellLocation, board: Board): Path;
}
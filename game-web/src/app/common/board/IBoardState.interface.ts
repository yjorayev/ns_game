import { ICellLocation } from '../location/ICellLocation.interface';
import { Path } from '../path/path';
import { Board } from './Board';
import { MessengerService } from '../messenger.service';
import { IFigure } from '../figure/IFigure.interface';

export interface IBoardState {
    updateState(figure: IFigure): IBoardState;
    getPath(toLocation: ICellLocation, board: Board): Path;
    onClick(messenger: MessengerService, figure: IFigure): void;
}
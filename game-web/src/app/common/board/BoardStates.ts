import { IBoardState } from './IBoardState.interface';
import { ICellLocation } from '../location/ICellLocation.interface';
import { PathService } from '../path/path.service';
import { Path } from '../path/path';
import { Board } from './Board';
import { MessengerService } from '../messenger.service';
import { IFigure } from '../figure/IFigure.interface';

export class ModifyingState implements IBoardState {
    private _modifyingFigure: IFigure;
    private _pathService;
    private _path: Path;

    constructor(modifyingFigure: IFigure) {
        this._modifyingFigure = modifyingFigure;
        this._pathService = new PathService();
    }

    updateState(figure: IFigure): IBoardState {
        return new IdleState();
    }

    getPath(toLocation: ICellLocation, board: Board): Path {
        this._path = this._pathService.getPath(board, this._modifyingFigure.currentLocation, toLocation);
        return this._path;
    }

    onClick(messenger: MessengerService, figure: IFigure) {
        if (this._path && figure.currentLocation.equals(this._path.to)) {
            this._modifyingFigure.moveOn(messenger, figure);
        } else {
            messenger.figureActivated(null);
        }
    }
}

export class IdleState implements IBoardState {
    updateState(figure: IFigure): IBoardState {
        return new ModifyingState(figure);
    }

    getPath(toLocation: ICellLocation, board: Board): Path {
        return null;
    }

    onClick(messenger: MessengerService, figure: IFigure) {
        figure.activate(messenger);
    }
}
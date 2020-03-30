import { IBoardState } from './IBoardState.interface';
import { ICellLocation } from '../location/ICellLocation.interface';
import { PathService } from '../path/path.service';
import { Path } from '../path/path';
import { Board } from './Board';

export class ModifyingState implements IBoardState {
    private _modifyingLocation: ICellLocation;
    private _pathService = new PathService();

    constructor(modifyingLocation: ICellLocation){
        this._modifyingLocation = modifyingLocation;
    }

    updateState(location: ICellLocation): IBoardState {
        return new IdleState();
    }

    getPath(toLocation: ICellLocation, board: Board): Path {
        return this._pathService.getPath(board, this._modifyingLocation, toLocation)
    }
}

export class IdleState implements IBoardState {
    updateState(location: ICellLocation): IBoardState {
        return new ModifyingState(location);
    }

    getPath(toLocation: ICellLocation, board: Board): Path {
        return null;
    }
}
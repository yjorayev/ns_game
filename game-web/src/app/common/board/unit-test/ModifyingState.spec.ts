import { IdleState, ModifyingState } from '../BoardStates';
import { IBoardState } from '../IBoardState.interface';
import { Frog } from '../../figure/FrogFigure';
import { Color } from '../../enums/color.enum';
import { MessengerService } from '../../messenger.service';
import { PathService } from '../../path/path.service';
import { TestBed } from '@angular/core/testing';
import { Path } from '../../path/path';
import { CellLocation } from '../../location/Location';

describe('Board Modifying State', () => {
    let boardState: IBoardState;
    let pathService: PathService;
    const figure = new Frog(Color.RED, new CellLocation(1, 7));
    const path = new Path(new CellLocation(1, 1), new CellLocation(1, 7));

    beforeEach(() => {
        boardState = new ModifyingState(figure);
        pathService = TestBed.inject(PathService);
    })

    it('update state should return idle state', () => {
        const nextState = boardState.updateState(figure);
        expect(nextState).toBeInstanceOf(IdleState);
    })

    it('should call path service getPath when getPath called', () => {
        spyOn(boardState['_pathService'], 'getPath').and.returnValue(path);
        expect(boardState.getPath(new CellLocation(1, 1), null)).toEqual(path);
    })

    it('should call modifying figure moveOn on click', () => {
        spyOn(figure, 'moveOn');
        spyOn(boardState['_pathService'], 'getPath').and.returnValue(path);

        boardState.getPath(new CellLocation(1, 1), null);
        boardState.onClick(new MessengerService(), figure);
        expect(figure.moveOn).toHaveBeenCalled();
    })
})
import { IdleState, ModifyingState } from '../BoardStates';
import { IBoardState } from '../IBoardState.interface';
import { Frog } from '../../figure/FrogFigure';
import { Color } from '../../enums/color.enum';
import { NullLocation } from '../../location/nullLocation';
import { CellLocation } from '../../location/Location';
import { MessengerService } from '../../messenger.service';

describe('Board Idle State', () => {
    let boardState: IBoardState;
    const figure = new Frog(Color.RED, NullLocation.Instance);
    beforeEach(() => {
        boardState = new IdleState();
    })

    it('update state should return modifying state', () => {
        const nextState = boardState.updateState(figure);
        expect(nextState).toBeInstanceOf(ModifyingState);
    })

    it('get path should return null', () => {
        expect(boardState.getPath(new CellLocation(1, 1), null)).toBeNull();
    })

    it('should call figure.activate on click', () => {
        spyOn(figure, 'activate');
        boardState.onClick(new MessengerService(), figure);
        expect(figure.activate).toHaveBeenCalled();
    })
})
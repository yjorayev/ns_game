import { Board } from './Board'
import { IdleState, ModifyingState } from './BoardStates';
import { CellLocation } from '../location/Location';

describe('Board', () => {
    let board;
    beforeEach(() => {
        board = new Board();
    })

    it('should initiate in Idle state', () => {
        expect(board.currentState).toBeInstanceOf(IdleState);
    })

    it('should change state to ModifyingState on click', () => {
        board.click(new CellLocation(1, 1));
        expect(board.currentState).toBeInstanceOf(ModifyingState);
    })

    it('should change state to IdleState on second click', () => {
        board.click(new CellLocation(1, 1));
        board.click(new CellLocation(1, 5));
        expect(board.currentState).toBeInstanceOf(IdleState);
    })
})
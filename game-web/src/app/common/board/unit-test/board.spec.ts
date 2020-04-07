import { Board } from '../Board'
import { IdleState, ModifyingState } from '../BoardStates';
import { CellLocation } from '../../location/Location';
import { MessengerService } from '../../messenger.service';
import { Frog } from '../../figure/FrogFigure';
import { Color } from '../../enums/color.enum';
import { NotMovableFigure } from '../../figure/NotMovableFigure';
import { Obstacle } from '../../figure/ObstacleFigure';
import { NullFigure } from '../../figure/NullFigure';
import { TestBed } from '@angular/core/testing';

describe('Board', () => {
    let board;
    const messenger = new MessengerService();

    beforeEach(() => {
        board = TestBed.inject(Board);
    });

    it('should initiate in Idle state', () => {
        expect(board.currentState).toBeInstanceOf(IdleState);
    });

    describe('movable frog click', () => {
        beforeEach(() => {
            spyOn(board, 'getFigure').and.returnValue(new Frog(Color.BLUE, new CellLocation(1, 1)));
        })

        it('should change state to ModifyingState on movable frog click', () => {
            board.click(new CellLocation(1, 1));
            expect(board.currentState).toBeInstanceOf(ModifyingState);
        });

        it('should change state to IdleState on second click after movable figure click', () => {
            board.click(new CellLocation(1, 1));
            board.click(new CellLocation(1, 5));
            expect(board.currentState).toBeInstanceOf(IdleState);
        });
    });

    describe('nonmovable figure click', () => {
        beforeEach(() => {
            const figure = new Frog(Color.BLUE, new CellLocation(1, 1));
            figure['_movable'] = NotMovableFigure.Instance;
            spyOn(board, 'getFigure').and.returnValue(figure);
        })


        it('should stay on idle state on nonmovable frog click', () => {
            board.click(new CellLocation(1, 1));
            expect(board.currentState).toBeInstanceOf(IdleState);
        });
    });

    describe('obstacle figure click', () => {
        beforeEach(() => {
            const figure = new Obstacle(Color.NULL, new CellLocation(1, 1));
            spyOn(board, 'getFigure').and.returnValue(figure);
        })


        it('should stay on idle state on obstacle figure click', () => {
            board.click(new CellLocation(1, 1));
            expect(board.currentState).toBeInstanceOf(IdleState);
        });
    });

    describe('null figure click', () => {
        beforeEach(() => {
            const figure = new NullFigure(new CellLocation(1, 1));
            spyOn(board, 'getFigure').and.returnValue(figure);
        })


        it('should stay on idle state on null figure click', () => {
            board.click(new CellLocation(1, 1));
            expect(board.currentState).toBeInstanceOf(IdleState);
        });
    });
})
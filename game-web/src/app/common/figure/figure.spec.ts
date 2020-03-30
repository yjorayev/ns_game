import { MovableFigure } from './MovableFigure'
import { DirectionDescriptor } from '../directionDescriptor/DirectionDescriptor';
import { CellLocation } from '../location/Location';
import { NotMovableFigure } from './NotMovableFigure';

describe('Figure Tests', () => {
    describe('Movable Figure', () => {
        const figure = MovableFigure.Instance;
        it('should be landable if moving from neighbour cell', () => {
            const loc = new CellLocation(2, 2);
            const result = figure.land(new DirectionDescriptor(1, 0), loc);
            expect(result).toBeTruthy();
            expect(result.canExpand).toBeFalse();
            expect(result.exitLocation).toEqual(loc);
        })

        it('should not be landable if moving from non-neighbour cell', () => {
            const loc = new CellLocation(2, 2);
            const result = figure.land(new DirectionDescriptor(1, 2), loc);
            expect(result).toBeNull();
        })
    })

    describe('NotMovable Figure', () => {
        const figure = NotMovableFigure.Instance;
        it('should not be landable', () => {
            const loc = new CellLocation(2, 2);
            const result = figure.land(new DirectionDescriptor(1, 2), loc);
            expect(result).toBeNull();
        })
    })
})
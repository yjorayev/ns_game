import { MovableFigure } from '../MovableFigure'
import { DirectionDescriptor } from '../../directionDescriptor/DirectionDescriptor';
import { CellLocation } from '../../location/Location';
import { NotMovableFigure } from '../NotMovableFigure';
import { Frog } from '../FrogFigure';
import { Color } from '../../enums/color.enum';
import { NullLocation } from '../../location/nullLocation';
import { MessengerService } from '../../messenger.service';

describe('Figure Tests', () => {
    const loc = new CellLocation(2, 2);

    describe('Movable Figure State', () => {
        const figureState = MovableFigure.Instance;

        it('should be landable if moving from neighbour cell', () => {
            const result = figureState.land(new DirectionDescriptor(1, 0), loc);
            expect(result).toBeTruthy();
            expect(result.canExpand).toBeFalse();
            expect(result.exitLocation).toEqual(loc);
        })

        it('should not be landable if moving from non-neighbour cell', () => {
            const result = figureState.land(new DirectionDescriptor(1, 2), loc);
            expect(result).toBeNull();
        })

        it('move should return target location', () => {
            expect(figureState.move(loc)).toEqual(loc);
        })

        it('should call figureActivated on activate', () => {
            const messenger = new MessengerService();
            spyOn(messenger, 'figureActivated');
            figureState.activate(messenger, new Frog(Color.BLUE, NullLocation.Instance));
            expect(messenger.figureActivated).toHaveBeenCalled();
        })
    })

    describe('NotMovable Figure State', () => {
        const figureState = NotMovableFigure.Instance;
        it('should not be landable', () => {
            const result = figureState.land(new DirectionDescriptor(1, 2), loc);
            expect(result).toBeNull();
        })

        it('move should return null location', () => {
            expect(figureState.move(loc)).toEqual(NullLocation.Instance);
        })
    })
})
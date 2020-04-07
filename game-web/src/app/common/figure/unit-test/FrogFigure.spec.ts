import { Frog } from '../FrogFigure'
import { Color } from '../../enums/color.enum'
import { CellLocation } from '../../location/Location'
import { DirectionDescriptor } from '../../directionDescriptor/DirectionDescriptor';
import { MovableFigure } from '../MovableFigure';
import { MessengerService } from '../../messenger.service';
import { NullFigure } from '../NullFigure';
import { IFigure } from '../IFigure.interface';

describe('Frog figure', () => {
    let frog: IFigure;
    const messenger = new MessengerService();
    const location = new CellLocation(2, 2);
    beforeEach(() => {
        frog = new Frog(Color.RED, new CellLocation(1, 1));
    })

    it('getLandResult should call land of IMovable', () => {
        spyOn(MovableFigure.Instance, 'land');
        frog.getLandResult(new DirectionDescriptor(1, 1), location);
        expect(MovableFigure.Instance.land).toHaveBeenCalled();
    })

    it('activate should call activate of IMovable', () => {
        spyOn(MovableFigure.Instance, 'activate');
        frog.activate(messenger);
        expect(MovableFigure.Instance.activate).toHaveBeenCalled();
    })

    it('moveOn should update currentLocations of both figures', () => {
        spyOn(messenger, 'figuresSwapped');
        const figure = new NullFigure(location);
        expect(frog.currentLocation).toEqual(new CellLocation(1, 1));
        frog.moveOn(messenger, figure);
        expect(frog.currentLocation).toEqual(location);
        expect(figure.currentLocation).toEqual(new CellLocation(1, 1));
        expect(messenger.figuresSwapped).toHaveBeenCalled();
    })

    it('moveOn should error on nonmovable state', () => {
        frog.moveOn(messenger, new NullFigure(location));
        expect(frog.moveOn).toThrowError();
    })
})
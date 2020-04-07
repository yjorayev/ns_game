import { IFigure } from '../IFigure.interface';
import { CellLocation } from '../../location/Location';
import { DirectionDescriptor } from '../../directionDescriptor/DirectionDescriptor';
import { NullFigure } from '../NullFigure';
import { LandResult } from '../../classes/LandResult';


describe('Frog figure', () => {
    let nullFigure: IFigure;
    const location = new CellLocation(2, 2);
    beforeEach(() => {
        nullFigure = new NullFigure(new CellLocation(1, 1));
    })

    it('getLandResult should return land result', () => {
        const result = nullFigure.getLandResult(new DirectionDescriptor(1, 1), location);
        expect(result).toEqual(new LandResult(location, true));
    })
})
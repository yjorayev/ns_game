import { Obstacle } from '../ObstacleFigure';
import { Color } from '../../enums/color.enum';
import { IFigure } from '../IFigure.interface';
import { CellLocation } from '../../location/Location';
import { DirectionDescriptor } from '../../directionDescriptor/DirectionDescriptor';


describe('Frog figure', () => {
    let obstacleFigure: IFigure;
    beforeEach(() => {
        obstacleFigure = new Obstacle(Color.RED, new CellLocation(1, 1));
    })

    it('getLandResult should return null', () => {
        const result = obstacleFigure.getLandResult(new DirectionDescriptor(1, 1), new CellLocation(1, 1));
        expect(result).toBeNull();
    })

    it('should throw error on moveon', () => {
        expect(obstacleFigure.moveOn).toThrowError();
    })
})
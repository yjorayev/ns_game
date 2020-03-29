import { CellLocation } from './Location'
import { NullLocation } from './nullLocation';

describe('CellLocation', () => {
    it('distanceTo NullLocation should be NaN', () => {
        const loc = new CellLocation(1, 1);
        const distance = loc.distanceTo(NullLocation.Instance);
        expect(Number.isNaN(distance.rowPush)).toBeTrue();
        expect(Number.isNaN(distance.columnPush)).toBeTrue();
    })
})

describe('NullLocation', () => {
    it('NullLocation should equal NullLocation', () => {
        expect(NullLocation.Instance.equals(NullLocation.Instance)).toBeTrue();
    })
})
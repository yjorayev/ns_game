import { IFigure } from '../interfaces/IFigure.interface';
import { Location } from './Location';

export class BoardState {
    public rows: number;
    public columns: number;
    public values: IFigure[][];

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
    }

    public getFigure(location: Location): IFigure {
        return this.values[location.row][location.column];
    }

    public setFigure(location: Location, figure: IFigure): void {
        this.values[location.row][location.column] = figure;
    }

    public isLocationValid(location: Location): boolean {
        return location && location.row >= 0 && location.row < this.rows &&
            location.column >= 0 && location.column < this.columns;
    }
}

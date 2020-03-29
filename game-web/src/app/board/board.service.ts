import { Injectable } from '@angular/core';
import { FigureType } from '../common/enums/figureTypes.enum';
import { Color } from '../common/enums/color.enum';
import { IFigure } from '../common/figure/IFigure.interface';
import { NullFigure } from '../common/figure/NullFigure';
import { ActiveFrog } from '../common/figure/ActiveFrogFigure';
import { Obstacle } from '../common/figure/ObstacleFigure';

const lvlInfo = [
    { row: 1, col: 1, type: FigureType.ACTIVEFROG, color: Color.RED },
    { row: 3, col: 5, type: FigureType.ACTIVEFROG, color: Color.RED },
    { row: 3, col: 6, type: FigureType.ACTIVEFROG, color: Color.RED },
    { row: 6, col: 2, type: FigureType.ACTIVEFROG, color: Color.RED },
    { row: 8, col: 1, type: FigureType.ACTIVEFROG, color: Color.RED },
    { row: 5, col: 4, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 6, col: 4, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 2, col: 7, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 7, col: 0, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 0, col: 4, type: FigureType.OBSTACLE, color: Color.NULL }
];

@Injectable()
export class BoardService {
    public getFigureFromSettings(row: number, column: number): IFigure {
        const figure = lvlInfo.find(
            info => info.row === row && info.col === column
        );
        if (figure) {
            return this.createFigure(figure.type, figure.color);
        }
        return new NullFigure();
    }

    public createFigure(type: FigureType, color: Color): IFigure {
        switch (type) {
            case FigureType.ACTIVEFROG:
                return new ActiveFrog(color);
            case FigureType.OBSTACLE:
                return new Obstacle(color);
            default:
                return new NullFigure();
        }
    }
}
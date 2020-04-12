import { FigureType } from '../common/enums/figureTypes.enum';
import { Color } from '../common/enums/color.enum';

export const lvlInfo = [
    { row: 1, col: 1, type: FigureType.FROG, color: Color.RED },
    { row: 3, col: 5, type: FigureType.FROG, color: Color.RED },
    { row: 3, col: 6, type: FigureType.FROG, color: Color.RED },
    { row: 6, col: 2, type: FigureType.FROG, color: Color.RED },
    { row: 8, col: 1, type: FigureType.FROG, color: Color.RED },
    { row: 5, col: 4, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 6, col: 4, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 2, col: 7, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 7, col: 0, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 0, col: 4, type: FigureType.OBSTACLE, color: Color.NULL }
];

export const size = 9;
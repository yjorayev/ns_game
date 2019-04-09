import { BoardService } from '../board.service';
import { Color } from 'src/app/common/enums/color.enum';
import { FigureType } from 'src/app/common/enums/figureTypes.enum';
import { Location} from '../../common/classes/Location';
import { BoardState } from 'src/app/common/classes/BoardState';

const lvlInfo = [
    { row: 1, col: 1, type: FigureType.FROG, color: Color.RED },
    { row: 3, col: 5, type: FigureType.FROG, color: Color.RED },
    { row: 6, col: 2, type: FigureType.FROG, color: Color.RED },
    { row: 8, col: 1, type: FigureType.FROG, color: Color.RED },
    { row: 5, col: 4, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 6, col: 4, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 2, col: 7, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 7, col: 0, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 0, col: 4, type: FigureType.OBSTACLE, color: Color.NULL }
];

describe('Board Service', () => {
    let service: BoardService;
    let board: BoardState;

    beforeEach(() => {
        service = new BoardService();
        board = new BoardState(9, 9);
        board.values = [];

        for (let i = 0; i < board.rows; i++) {
            board.values[i] = [];
            for (let j = 0; j < board.columns; j++) {
                const figure = service.getFigureFromSettings(i, j);
                board.setFigure(new Location(i, j), figure);
            }
        }
    });

    fit('can get correct path', () => {
        const path = service.getPath(board, new Location(1, 1), new Location(8, 8));
        expect(path).toBeTruthy();
        expect(path.from.row).toEqual(1);
        expect(path.from.column).toEqual(1);
        expect(path.to.row).toEqual(8);
        expect(path.to.column).toEqual(8);
        expect(path.midPoint.row).toEqual(1);
        expect(path.midPoint.column).toEqual(8);

    });

    it('can get correct path', () => {
      const path = service.getPath(board, new Location(1, 1), new Location(3, 3));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(1);
      expect(path.from.column).toEqual(1);
      expect(path.to.row).toEqual(3);
      expect(path.to.column).toEqual(3);
      expect(path.midPoint.row).toEqual(1);
      expect(path.midPoint.column).toEqual(3);

  });
});

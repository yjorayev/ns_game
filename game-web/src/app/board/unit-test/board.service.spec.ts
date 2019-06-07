import { BoardService } from '../board.service';
import { CellLocation } from '../../common/classes/Location';
import { BoardState } from 'src/app/common/classes/BoardState';

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
        board.setFigure(new CellLocation(i, j), figure);
      }
    }
  });

  describe('can get correct path', () => {
    it('can get correct path1', () => {
      const path = service.getPath(board, new CellLocation(1, 1), new CellLocation(8, 8));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(1);
      expect(path.from.column).toEqual(1);
      expect(path.to.row).toEqual(8);
      expect(path.to.column).toEqual(8);
      expect(path.midPoint.row).toEqual(1);
      expect(path.midPoint.column).toEqual(8);
    });

    it('can get correct path2', () => {
      const path = service.getPath(board, new CellLocation(1, 1), new CellLocation(3, 3));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(1);
      expect(path.from.column).toEqual(1);
      expect(path.to.row).toEqual(3);
      expect(path.to.column).toEqual(3);
      expect(path.midPoint.row).toEqual(3);
      expect(path.midPoint.column).toEqual(1);
    });

    it('can get correct path3', () => {
      const path = service.getPath(board, new CellLocation(3, 5), new CellLocation(5, 2));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(3);
      expect(path.from.column).toEqual(5);
      expect(path.to.row).toEqual(5);
      expect(path.to.column).toEqual(2);
      expect(path.midPoint.row).toEqual(3);
      expect(path.midPoint.column).toEqual(2);
    });

    it('can get correct path4', () => {
      const path = service.getPath(board, new CellLocation(6, 2), new CellLocation(3, 4));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(6);
      expect(path.from.column).toEqual(2);
      expect(path.to.row).toEqual(3);
      expect(path.to.column).toEqual(4);
      expect(path.midPoint.row).toEqual(3);
      expect(path.midPoint.column).toEqual(2);
    });

    it('can get correct path5', () => {
      const path = service.getPath(board, new CellLocation(1, 1), new CellLocation(7, 1));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(1);
      expect(path.from.column).toEqual(1);
      expect(path.to.row).toEqual(7);
      expect(path.to.column).toEqual(1);
      expect(path.midPoint).toBeUndefined();
    });

    it('can get correct path6', () => {
      const path = service.getPath(board, new CellLocation(8, 1), new CellLocation(2, 1));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(8);
      expect(path.from.column).toEqual(1);
      expect(path.to.row).toEqual(2);
      expect(path.to.column).toEqual(1);
      expect(path.midPoint).toBeUndefined();
    });

    it('can get correct path7', () => {
      const path = service.getPath(board, new CellLocation(6, 2), new CellLocation(5, 5));
      expect(path).toBeFalsy();
    });

    it('can get correct path8', () => {
      const path = service.getPath(board, new CellLocation(6, 2), new CellLocation(6, 5));
      expect(path).toBeFalsy();
    });

    it('can get correct path9', () => {
      const path = service.getPath(board, new CellLocation(3, 5), new CellLocation(3, 6));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(3);
      expect(path.from.column).toEqual(5);
      expect(path.to.row).toEqual(3);
      expect(path.to.column).toEqual(6);
      expect(path.midPoint).toBeUndefined();
    });

    it('can get correct path10', () => {
      const path = service.getPath(board, new CellLocation(3, 5), new CellLocation(3, 7));
      expect(path).toBeFalsy();
    });

    it('can get correct path11', () => {
      const path = service.getPath(board, new CellLocation(8, 1), new CellLocation(2, 1));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(8);
      expect(path.from.column).toEqual(1);
      expect(path.to.row).toEqual(2);
      expect(path.to.column).toEqual(1);
      expect(path.midPoint).toBeUndefined();
    });

    it('can get correct path12', () => {
      const path = service.getPath(board, new CellLocation(1, 1), new CellLocation(3, 5));
      expect(path).toBeFalsy();
    });

    it('can get correct path12', () => {
      const path = service.getPath(board, new CellLocation(1, 1), new CellLocation(0, 4));
      expect(path).toBeFalsy();
    });
  });
});

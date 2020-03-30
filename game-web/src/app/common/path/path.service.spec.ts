import { PathService } from './path.service';
import { CellLocation } from '../location/Location';
import { BoardService } from '../../board/board.service';
import { NullLocation } from '../location/nullLocation';
import { Board } from '../board/Board';

describe('Path Service', () => {
  let pathService: PathService;
  let boardService: BoardService;
  let board: Board;

  beforeEach(() => {
    pathService = new PathService();
    boardService = new BoardService(new Board());
    board = boardService.createBoard();
  });

  describe('can get correct path', () => {
    it('can get correct path1', () => {
      const path = pathService.getPath(board, new CellLocation(1, 1), new CellLocation(8, 8));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(1);
      expect(path.from.column).toEqual(1);
      expect(path.to.row).toEqual(8);
      expect(path.to.column).toEqual(8);
      expect(path.midPoint.row).toEqual(1);
      expect(path.midPoint.column).toEqual(8);
    });

    it('can get correct path2', () => {
      const path = pathService.getPath(board, new CellLocation(1, 1), new CellLocation(3, 3));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(1);
      expect(path.from.column).toEqual(1);
      expect(path.to.row).toEqual(3);
      expect(path.to.column).toEqual(3);
      expect(path.midPoint.row).toEqual(3);
      expect(path.midPoint.column).toEqual(1);
    });

    it('can get correct path3', () => {
      const path = pathService.getPath(board, new CellLocation(3, 5), new CellLocation(5, 2));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(3);
      expect(path.from.column).toEqual(5);
      expect(path.to.row).toEqual(5);
      expect(path.to.column).toEqual(2);
      expect(path.midPoint.row).toEqual(3);
      expect(path.midPoint.column).toEqual(2);
    });

    it('can get correct path4', () => {
      const path = pathService.getPath(board, new CellLocation(6, 2), new CellLocation(3, 4));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(6);
      expect(path.from.column).toEqual(2);
      expect(path.to.row).toEqual(3);
      expect(path.to.column).toEqual(4);
      expect(path.midPoint.row).toEqual(3);
      expect(path.midPoint.column).toEqual(2);
    });

    it('can get correct path5', () => {
      const path = pathService.getPath(board, new CellLocation(1, 1), new CellLocation(7, 1));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(1);
      expect(path.from.column).toEqual(1);
      expect(path.to.row).toEqual(7);
      expect(path.to.column).toEqual(1);
      expect(path.midPoint).toBe(NullLocation.Instance);
    });

    it('can get correct path6', () => {
      const path = pathService.getPath(board, new CellLocation(8, 1), new CellLocation(2, 1));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(8);
      expect(path.from.column).toEqual(1);
      expect(path.to.row).toEqual(2);
      expect(path.to.column).toEqual(1);
      expect(path.midPoint).toBe(NullLocation.Instance);
    });

    it('can get correct path7', () => {
      const path = pathService.getPath(board, new CellLocation(6, 2), new CellLocation(5, 5));
      expect(path).toBeFalsy();
    });

    it('can get correct path8', () => {
      const path = pathService.getPath(board, new CellLocation(6, 2), new CellLocation(6, 5));
      expect(path).toBeFalsy();
    });

    it('can get correct path9', () => {
      const path = pathService.getPath(board, new CellLocation(3, 5), new CellLocation(3, 6));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(3);
      expect(path.from.column).toEqual(5);
      expect(path.to.row).toEqual(3);
      expect(path.to.column).toEqual(6);
      expect(path.midPoint).toBe(NullLocation.Instance);
    });

    it('can get correct path10', () => {
      const path = pathService.getPath(board, new CellLocation(3, 5), new CellLocation(3, 7));
      expect(path).toBeFalsy();
    });

    it('can get correct path11', () => {
      const path = pathService.getPath(board, new CellLocation(8, 1), new CellLocation(2, 1));
      expect(path).toBeTruthy();
      expect(path.from.row).toEqual(8);
      expect(path.from.column).toEqual(1);
      expect(path.to.row).toEqual(2);
      expect(path.to.column).toEqual(1);
      expect(path.midPoint).toBe(NullLocation.Instance);
    });

    it('can get correct path12', () => {
      const path = pathService.getPath(board, new CellLocation(1, 1), new CellLocation(3, 5));
      expect(path).toBeFalsy();
    });

    it('can get correct path12', () => {
      const path = pathService.getPath(board, new CellLocation(1, 1), new CellLocation(0, 4));
      expect(path).toBeFalsy();
    });

    it('can get correct path13', () => {
      const path = pathService.getPath(board, new CellLocation(2, 3), new CellLocation(2, 4));
      expect(path.from.row).toEqual(2);
      expect(path.from.column).toEqual(3);
      expect(path.to.row).toEqual(2);
      expect(path.to.column).toEqual(4);
      expect(path.midPoint).toBe(NullLocation.Instance);
    });

    it('get path from NullLocation should return null', () => {
      const path = pathService.getPath(board, NullLocation.Instance, new CellLocation(1, 1));
      expect(path).toBeNull();
    });
  });
});

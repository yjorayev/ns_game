import { Injectable } from '@angular/core';
import { Path } from '../common/classes/Path';
import { Location } from '../common/classes/Location';
import { DirectionDescriptor } from '../common/classes/StepDescriptor';
import { StepDescriptor } from '../common/classes/JumpDescriptor';
import { BoardState } from '../common/classes/BoardState';
import { IFigure } from '../common/interfaces/IFigure.interface';
import { NullFigure } from '../common/Figures/NullFigure';
import { FigureType } from '../common/enums/figureTypes.enum';
import { Color } from '../common/enums/color.enum';
import { Frog } from '../common/Figures/FrogFigure';
import { Obstacle } from '../common/Figures/ObstacleFigure';

@Injectable()
export class BoardService {
  private directions: DirectionDescriptor[] = [
    new DirectionDescriptor(-1, 0), // UP
    new DirectionDescriptor(0, 1), // RIGHT
    new DirectionDescriptor(1, 0), // DOWN
    new DirectionDescriptor(0, -1) // LEFT
  ];

  public getFigureFromSettings(row: number, column: number): IFigure {
    const figure = lvlInfo.find(
      info => info.row === row && info.col === column
    );
    if (figure) {
      return this.createFigure(figure.type, figure.color);
    }
    return new NullFigure();
  }

  public getPath(boardState: BoardState, from: Location, to: Location): Path {
    let queue = [
      {
        step: { location: from, canChangeDirection: true },
        path: new Path(from, from)
      } as QueueItem
    ];

    while (queue.length > 0) {
      const lastItem = queue[queue.length - 1];

      if (
        lastItem.step.location.row === to.row &&
        lastItem.step.location.column === to.column
      ) {
        return lastItem.path;
      }

      queue.pop();
      // queue.push(...this.getNextItems(lastItem, boardState));
      queue = this.AddNextLocationsToQueue(lastItem, boardState, queue);
    }

    return null;
  }

  private AddNextLocationsToQueue(
    item: QueueItem,
    boardState: BoardState,
    queue: QueueItem[]
  ): QueueItem[] {
    const currentFigure = boardState.getFigure(item.step.location);
    if (item.step.canChangeDirection) {
      queue = this.GetNextLocationWhenCanChangeDirection(
        item,
        boardState,
        queue
      );
    } else {
      queue = this.GetNextLocationWhenCannotChangeDirection(
        item,
        boardState,
        queue
      );
    }

    return queue;
  }

  private GetNextLocationWhenCanChangeDirection(
    item: QueueItem,
    boardState: BoardState,
    queue: QueueItem[]
  ): QueueItem[] {
    for (const dir of this.directions) {
      const nextLocation = item.step.location.shift(dir);
      if (boardState.isLocationValid(nextLocation)) {
        const nextFigure = boardState.getFigure(nextLocation);
        if (nextFigure.isLandable) {
          queue.push(this.GetNextWhenLandable(item, nextLocation, dir));
        } else if (nextFigure.isJumpable) {
          queue.push(
            this.GetNextWhenJumpable(
              item,
              nextLocation,
              nextFigure,
              boardState,
              dir
            )
          );
        }

        return queue;
      }
    }
  }

  private GetNextWhenLandable(
    item: QueueItem,
    nextLocation: Location,
    dir: DirectionDescriptor
  ): QueueItem {
    const directionChanged = !item.step.currentDirection.equals(dir);
    let path: Path;
    if (directionChanged) {
      path = new Path(item.path.from, nextLocation, item.path.to);
    } else {
      path = new Path(item.path.from, nextLocation);
    }

    return {
      step: {
        location: nextLocation,
        canChangeDirection: !directionChanged,
        currentDirection: dir
      },
      path
    } as QueueItem;
  }

  private GetNextWhenJumpable(
    item: QueueItem,
    nextLocation: Location,
    nextFigure: IFigure,
    boardState: BoardState,
    dir: DirectionDescriptor
  ): QueueItem {
    const directionChanged = !item.step.currentDirection.equals(dir);
    let step = new StepDescriptor(nextLocation, !directionChanged, dir);
    step = nextFigure.jump(step, boardState);

    let path: Path;
    if (directionChanged) {
      path = new Path(item.path.from, step.location, item.path.to);
    } else {
      path = new Path(item.path.from, step.location);
    }

    return { step, path };
  }

  // private getNextItems(item: QueueItem, boardState: BoardState): QueueItem[] {
  //     //
  //     //totally wrong algorithm
  //     //
  //     const figure = boardState.getFigure(item.jump.location);
  //     const items: QueueItem[] = [];
  //     if (item.jump.canChangeDirection) {
  //         for (const dir of this.directions) {
  //             if (!item.jump.currentDirection) {
  //                 item.jump.currentDirection = dir;
  //             }

  //             if (figure.isJumpable) {
  //                 const jump = figure.jump(item.jump, boardState);
  //                 if (jump) {
  //                     const canChangeDirection = item.jump.currentDirection.equals(dir) ? true : false;
  //                     const path = canChangeDirection ?
  //                         new Path(item.path.from, jump.location)
  //                         : new Path(item.path.from, jump.location, item.path.to);

  //                     items.push({
  //                         jump: { location: jump.location, currentDirection: jump.currentDirection, canChangeDirection },
  //                         path
  //                     });
  //                 }
  //             }
  //         }
  //     } else {
  //         const jump = figure.jump(item.jump, boardState);
  //         const path = item.path;
  //         items.push({ jump, path });
  //     }
  //     return items.filter(i => boardState.isLocationValid(i.jump.location));
  // }

  private createBoolean2DArray(rows: number, cols: number): boolean[][] {
    const arr = [];
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      for (let j = 0; j < cols[i].length; j++) {
        arr[i][j] = false;
      }
    }
    return arr;
  }

  public createFigure(type: FigureType, color: Color): IFigure {
    switch (type) {
      case FigureType.FROG:
        return new Frog(false, color);
      case FigureType.OBSTACLE:
        return new Obstacle(color);
      default:
        return new NullFigure();
    }
  }
}

class QueueItem {
  step: StepDescriptor;
  path: Path;
}

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

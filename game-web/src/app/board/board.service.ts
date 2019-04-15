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
    const visited: StepDescriptor[] = [];
    let queue = [
      {
        step: { location: from, canChangeDirection: true },
        path: new Path(from, from)
      } as QueueItem
    ];

    visited.push(new StepDescriptor(from, true, null));

    while (queue.length > 0) {
      const lastItem = queue[queue.length - 1];

      if (
        lastItem.step.location.row === to.row &&
        lastItem.step.location.column === to.column
      ) {
        return lastItem.path;
      }

      queue.pop();
      const nextItems = this.AddNextLocationsToQueue(
        lastItem,
        boardState,
        visited
      );
      queue = queue.concat(nextItems);
    }

    return null;
  }

  private AddNextLocationsToQueue(
    item: QueueItem,
    boardState: BoardState,
    visited: StepDescriptor[]
  ): QueueItem[] {
    let queue: QueueItem[] = [];
    if (item.step.canChangeDirection) {
      queue = this.GetNextLocationWhenCanChangeDirection(
        item,
        boardState,
        visited
      );
    } else {
      queue = this.GetNextLocationWhenCannotChangeDirection(
        item,
        boardState,
        visited
      );
    }

    return queue;
  }

  private GetNextLocationWhenCanChangeDirection(
    item: QueueItem,
    boardState: BoardState,
    visited: StepDescriptor[]
  ): QueueItem[] {
    let queue: QueueItem[] = [];
    let isDirectionSet = false;
    if (item.step.currentDirection) {
      isDirectionSet = true;
    }

    for (const dir of this.directions) {
      if (!isDirectionSet) {
        item.step.currentDirection = dir;
        visited[0].currentDirection = dir;
      }

      queue = queue.concat(
        this.GetNextLocationByDirection(item, boardState, dir, visited)
      );
    }
    return queue;
  }

  private GetNextLocationWhenCannotChangeDirection(
    item: QueueItem,
    boardState: BoardState,
    visited: StepDescriptor[]
  ): QueueItem[] {
    return this.GetNextLocationByDirection(
      item,
      boardState,
      item.step.currentDirection,
      visited
    );
  }

  private GetNextLocationByDirection(
    item: QueueItem,
    boardState: BoardState,
    dir: DirectionDescriptor,
    visited: StepDescriptor[]
  ): QueueItem[] {
    const queue: QueueItem[] = [];
    const nextLocation = item.step.location.shift(dir);
    const directionChanged = !item.step.currentDirection.equals(dir);
    let step = new StepDescriptor(nextLocation, item.step.canChangeDirection && !directionChanged, dir);

    if (!this.isInList(visited, step) && boardState.isLocationValid(nextLocation)) {
      const nextFigure = boardState.getFigure(nextLocation);
      const path = this.BuildPathByStep(directionChanged, item, step);

      if (nextFigure.isLandable) {
        this.addToQueue(step, path, queue, visited);
      }
      if (nextFigure.isJumpable) {
        step = nextFigure.jump(step, boardState);
        this.addToQueue(step, path, queue, visited);
      }
    }
    return queue;
  }

  private BuildPathByStep(directionChanged: boolean, item: QueueItem, step: StepDescriptor): Path {
    let path: Path;
    if (directionChanged) {
      path = new Path(item.path.from, step.location, item.path.to);
    } else {
      path = new Path(item.path.from, step.location, item.path.midPoint);
    }
    return path;
  }

  private addToQueue(step: StepDescriptor, path: Path, queue: QueueItem[], visited: StepDescriptor[]): void {
    queue.push({ step, path });
    visited.push(step);
  }

  private isInList(list: StepDescriptor[], item: StepDescriptor): boolean {
    return list.findIndex(i => item.equals(i)) > -1;
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

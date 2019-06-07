import { Injectable } from '@angular/core';
import { Path } from '../common/classes/Path';
import { CellLocation } from '../common/classes/Location';
import { DirectionDescriptor } from '../common/classes/DirectionDescriptor';
import { StepDescriptor } from '../common/classes/StepDescriptor';
import { BoardState } from '../common/classes/BoardState';
import { IFigure } from '../common/interfaces/IFigure.interface';
import { NullFigure } from '../common/Figures/NullFigure';
import { FigureType } from '../common/enums/figureTypes.enum';
import { Color } from '../common/enums/color.enum';
import { Obstacle } from '../common/Figures/ObstacleFigure';
import { ActiveFrog } from '../common/Figures/ActiveFrogFigure';
import { QueueItem, PossibleStepsQueue } from '../common/classes/PossibleStepsQueue';

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
  private directions: DirectionDescriptor[] = [
    new DirectionDescriptor(-1, 0), // UP
    new DirectionDescriptor(0, 1), // RIGHT
    new DirectionDescriptor(1, 0), // DOWN
    new DirectionDescriptor(0, -1) // LEFT
  ];

  private boardState: BoardState;
  private takenSteps: StepDescriptor[];

  public getFigureFromSettings(row: number, column: number): IFigure {
    const figure = lvlInfo.find(
      info => info.row === row && info.col === column
    );
    if (figure) {
      return this.createFigure(figure.type, figure.color);
    }
    return new NullFigure();
  }

  public getPath(boardState: BoardState, from: CellLocation, to: CellLocation): Path {
    this.boardState = boardState;
    this.takenSteps = [];

    let stepsToTake: PossibleStepsQueue = [{
      step: new StepDescriptor(from, true, null),
      path: new Path(from, from),
      canExpand: true
    }];


    while (stepsToTake.length > 0) {
      const lastItem = stepsToTake.pop();

      if (lastItem.path.to.equals(to)) {
        return lastItem.path;
      }

      if (lastItem.canExpand) {
        const nextLocations = this.GetNextLocationsToVisit(lastItem);
        stepsToTake = stepsToTake.concat(nextLocations);
      }
    }

    return null;
  }

  private GetNextLocationsToVisit(item: QueueItem): QueueItem[] {
    let queue: QueueItem[] = [];
    if (item.step.canChangeDirection) {
      queue = this.GetNextLocationWhenCanChangeDirection(item);
    } else {
      queue = this.GetNextLocationWhenCannotChangeDirection(item);
    }

    return queue;
  }

  private GetNextLocationWhenCanChangeDirection(item: QueueItem): QueueItem[] {
    let queue: QueueItem[] = [];
    let isDirectionSet = false;
    if (item.step.currentDirection) {
      isDirectionSet = true;
    }

    for (const dir of this.directions) {
      if (!isDirectionSet) {
        item.step.currentDirection = dir;
        // takenSteps[0].currentDirection = dir;
      }

      queue = queue.concat(this.GetNextLocationByDirection(item, dir));
    }
    return queue;
  }

  private GetNextLocationWhenCannotChangeDirection(item: QueueItem): QueueItem[] {
    return this.GetNextLocationByDirection(item, item.step.currentDirection);
  }

  private GetNextLocationByDirection(item: QueueItem, dir: DirectionDescriptor): QueueItem[] {
    const queue: QueueItem[] = [];
    const directionChanged = !item.step.currentDirection.equals(dir);
    const step = new StepDescriptor(item.step.from, item.step.canChangeDirection && !directionChanged, dir);

    if (!this.isInList(this.takenSteps, step)) {
      const nextCell = item.step.from.shift(dir);
      const landResult = this.boardState.land(nextCell, item.path.from);

      if (landResult) {
        const path = this.BuildPathByStep(directionChanged, item, landResult.exitLocation);
        const nextStep = new StepDescriptor(landResult.exitLocation, step.canChangeDirection, step.currentDirection);
        queue.push(new QueueItem(nextStep, path, landResult.canExpand));
      }

      this.takenSteps.push(step);
    }
    return queue;
  }

  private BuildPathByStep(directionChanged: boolean, item: QueueItem, endLocation: CellLocation): Path {
    let path: Path;
    if (directionChanged) {
      path = new Path(item.path.from, endLocation, item.path.to);
    } else {
      path = new Path(item.path.from, endLocation, item.path.midPoint);
    }
    return path;
  }

  private isInList(list: StepDescriptor[], item: StepDescriptor): boolean {
    return list.findIndex(i => item.equals(i)) > -1;
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

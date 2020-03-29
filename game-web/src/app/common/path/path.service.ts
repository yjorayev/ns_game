import { Injectable } from '@angular/core';
import { Path } from './path';
import { DirectionDescriptor } from '../directionDescriptor/directionDescriptor';
import { StepDescriptor } from '../classes/StepDescriptor';
import { BoardState } from '../classes/BoardState';
import { QueueItem, PossibleStepsQueue } from '../classes/PossibleStepsQueue';
import { NullDirectionDescriptor } from '../directionDescriptor/nullDirectionDescriptor';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';
import { ICellLocation } from '../location/ICellLocation.interface';

@Injectable()
export class PathService {
  private directions: DirectionDescriptor[] = [
    new DirectionDescriptor(-1, 0), // UP
    new DirectionDescriptor(0, 1), // RIGHT
    new DirectionDescriptor(1, 0), // DOWN
    new DirectionDescriptor(0, -1) // LEFT
  ];

  private boardState: BoardState;
  private takenSteps: StepDescriptor[];

  public getPath(boardState: BoardState, from: ICellLocation, to: ICellLocation): Path {
    this.boardState = boardState;
    this.takenSteps = [];

    let stepsToTake: PossibleStepsQueue = [{
      step: new StepDescriptor(from, true, NullDirectionDescriptor.Instance),
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
    const initialDirection = item.step.currentDirection;

    for (const dir of this.directions) {
      item.step.currentDirection = initialDirection.updateDirection(dir);

      if (!item.step.currentDirection.isReverseOf(dir)) {
        queue = queue.concat(this.GetNextLocationByDirection(item, dir));
      }
    }
    return queue;
  }

  private GetNextLocationWhenCannotChangeDirection(item: QueueItem): QueueItem[] {
    return this.GetNextLocationByDirection(item, item.step.currentDirection);
  }

  private GetNextLocationByDirection(item: QueueItem, dir: IDirectionDescriptor): QueueItem[] {
    const queue: QueueItem[] = [];
    const directionChanged = !item.step.currentDirection.equals(dir);
    const step = new StepDescriptor(item.step.from, item.step.canChangeDirection && !directionChanged, dir);

    if (!this.isInList(this.takenSteps, step)) {
      const nextCell = item.step.from.shift(dir);
      const landResult = this.boardState.getLandResult(nextCell, item.path.from);

      if (landResult) {
        const path = this.BuildPathByStep(directionChanged, item, landResult.exitLocation);
        const nextStep = new StepDescriptor(landResult.exitLocation, step.canChangeDirection, step.currentDirection);
        queue.push(new QueueItem(nextStep, path, landResult.canExpand));
      }

      this.takenSteps.push(step);
    }
    return queue;
  }

  private BuildPathByStep(directionChanged: boolean, item: QueueItem, endLocation: ICellLocation): Path {
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
}
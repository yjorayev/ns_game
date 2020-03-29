import { StepDescriptor } from './StepDescriptor';
import { Path } from '../path/path';

export class QueueItem {
  step: StepDescriptor;
  path: Path;
  canExpand: boolean;

  constructor(step: StepDescriptor, path: Path, canExpand: boolean) {
    this.step = step;
    this.path = path;
    this.canExpand = canExpand;
  }
}

export type PossibleStepsQueue = Array<QueueItem>;

import { CellLocation } from './Location';

export class LandResult{
  exitLocation: CellLocation;
  canExpand: boolean;

  constructor(location: CellLocation, canProceed: boolean){
    this.exitLocation = location;
    this.canExpand = canProceed;
  }
}

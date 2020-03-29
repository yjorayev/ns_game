import { ICellLocation } from '../location/ICellLocation.interface';

export class LandResult{
  exitLocation: ICellLocation;
  canExpand: boolean;

  constructor(location: ICellLocation, canProceed: boolean){
    this.exitLocation = location;
    this.canExpand = canProceed;
  }
}

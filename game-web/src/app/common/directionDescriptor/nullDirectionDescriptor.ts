import { IDirectionDescriptor } from './IDirectionDescriptor.interface';

export class NullDirectionDescriptor implements IDirectionDescriptor {
    private static _instance: NullDirectionDescriptor;

    rowPush = Number.NaN;
    columnPush = Number.NaN;

    private constructor() { };

    static get Instance() {
        return this._instance || (this._instance = new this());
    }

    equals = (item: IDirectionDescriptor) => false;
    isOneStepAway = () => false;
    isReverseOf = (item: IDirectionDescriptor) => false;

    updateDirection(direction: IDirectionDescriptor): IDirectionDescriptor {
        return direction;
    }
}
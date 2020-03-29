export interface IDirectionDescriptor {
    rowPush: number;
    columnPush: number;
    equals(item: IDirectionDescriptor): boolean;
    isOneStepAway(): boolean;
    isReverseOf(item: IDirectionDescriptor): boolean;
    updateDirection(direction: IDirectionDescriptor): IDirectionDescriptor;
}
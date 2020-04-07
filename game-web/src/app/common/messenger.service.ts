import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IFigure } from './figure/IFigure.interface';

@Injectable({
    providedIn: 'root'
})
export class MessengerService {
    private _figureActivatedSubject: Subject<IFigure> = new Subject<IFigure>();
    private _figureLocationChangedSubject: Subject<{ figure1: IFigure, figure2: IFigure }>
        = new Subject<{ figure1: IFigure, figure2: IFigure }>();

    figureActivated(figure: IFigure): void {
        this._figureActivatedSubject.next(figure);
    }

    onFigureActivated(): Observable<IFigure> {
        return this._figureActivatedSubject.asObservable();
    }

    figuresSwapped(figure1: IFigure, figure2: IFigure): void {
        this._figureLocationChangedSubject.next({ figure1, figure2 });
    }

    onfiguresSwapped(): Observable<{ figure1: IFigure, figure2: IFigure }> {
        return this._figureLocationChangedSubject.asObservable();
    }

}
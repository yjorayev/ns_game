import { Injectable } from '@angular/core';
import { FigureType } from '../common/enums/figureTypes.enum';
import { Color } from '../common/enums/color.enum';
import { IFigure } from '../common/figure/IFigure.interface';
import { NullFigure } from '../common/figure/NullFigure';
import { Obstacle } from '../common/figure/ObstacleFigure';
import { CellLocation } from '../common/location/Location';
import { ICellLocation } from '../common/location/ICellLocation.interface';
import { Frog } from '../common/figure/FrogFigure';
import { Board } from '../common/board/Board';
import { Path } from '../common/path/path';
import { lvlInfo, size } from './game-settings';

@Injectable()
export class BoardService {
    constructor(private _board: Board) { }

    createBoard(): Board {
        this._board.setDimensions(size, size);
        this._board.values = [];
        for (let i = 0; i < size; i++) {
            this._board.values[i] = [];
            for (let j = 0; j < size; j++) {
                const figure = this.getFigureFromSettings(i, j);
                this._board.setFigure(new CellLocation(i, j), figure);
            }
        }
        return this._board;
    }

    getPath(toLocation: ICellLocation): Path {
        return this._board.getPath(toLocation);
    }

    onBoardClick(location: CellLocation) {
        this._board.click(location);
    }

    private getFigureFromSettings(row: number, column: number): IFigure {
        const figure = lvlInfo.find(
            info => info.row === row && info.col === column
        );
        const location = new CellLocation(row, column);
        if (figure) {
            return this.createFigure(figure.type, figure.color, location);
        }
        return new NullFigure(location);
    }

    private createFigure(type: FigureType, color: Color, location: ICellLocation): IFigure {
        switch (type) {
            case FigureType.FROG:
                return new Frog(color, location);
            case FigureType.OBSTACLE:
                return new Obstacle(color, location);
            default:
                return new NullFigure(location);
        }
    }
}
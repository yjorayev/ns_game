import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { BoardService } from './game.service';
import { size } from './game-settings';
import { ModifyingState, IdleState } from '../common/board/BoardStates';
import { NotMovableFigure } from '../common/figure/NotMovableFigure';
import { MovableFigure } from '../common/figure/MovableFigure';


describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let moveFigureAction: (fromIdx: number, toIdx: number) => void;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [BoardService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    moveFigureAction = (fromIdx: number, toIdx: number) => {
      const element: HTMLElement = fixture.nativeElement;
      const cells = element.getElementsByClassName('cell');
      const fromCell = cells[fromIdx] as HTMLElement;
      const toCell = cells[toIdx] as HTMLElement;

      // first click
      fromCell.click();
      expect(component.board.currentState).toBeInstanceOf(ModifyingState);

      // hower
      const event = new Event('mouseover');
      toCell.dispatchEvent(event);

      // second click
      toCell.click();
      expect(component.board.currentState).toBeInstanceOf(IdleState);
    }

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.board).toBeTruthy();
    expect(component.board.values.length).toEqual(size);
    expect(component.board.values[0].length).toEqual(size);
  });

  it('should stay idle when trying to move to same location', () => {
    const from = component.board.values[3][5];
    moveFigureAction(size * 3 + 5, size * 3 + 5);
    expect(component.board.values[3][5]).toEqual(from);
    expect(from['_movable']).toEqual(MovableFigure.Instance);
  });

  it('should move when moved to empty location and path exists', () => {
    const from = component.board.values[3][5];
    const to = component.board.values[3][4];

    moveFigureAction(size * 3 + 5, size * 3 + 4);

    expect(component.board.values[3][5]).toEqual(to);
    expect(component.board.values[3][4]).toEqual(from);
    expect(from['_movable']).toEqual(NotMovableFigure.Instance);
  });

  it('should move when moved to nearby active frog', () => {
    const from = component.board.values[3][5];
    const to = component.board.values[3][6];

    moveFigureAction(size * 3 + 5, size * 3 + 6);

    expect(component.board.values[3][5]).toEqual(to);
    expect(component.board.values[3][6]).toEqual(from);
    expect(from['_movable']).toEqual(NotMovableFigure.Instance);
    expect(to['_movable']).toEqual(MovableFigure.Instance);
  });

  it('should not move when moved to nearby inactive frog', () => {
    const from = component.board.values[3][5];
    const to = component.board.values[3][6];

    moveFigureAction(size * 3 + 5, size * 3 + 6);

    expect(component.board.values[3][5]).toEqual(to);
    expect(component.board.values[3][6]).toEqual(from);
    expect(from['_movable']).toEqual(NotMovableFigure.Instance);
    expect(to['_movable']).toEqual(MovableFigure.Instance);

    moveFigureAction(size * 3 + 5, size * 3 + 6);
    expect(component.board.values[3][5]).toEqual(to);
    expect(component.board.values[3][6]).toEqual(from);
    expect(from['_movable']).toEqual(NotMovableFigure.Instance);
    expect(to['_movable']).toEqual(MovableFigure.Instance);
  })

  it('should not move when moved to empty location and path does not exist', () => {
    const from = component.board.values[3][5];
    const to = component.board.values[3][7];

    moveFigureAction(size * 3 + 5, size * 3 + 7);

    expect(component.board.values[3][5]).toEqual(from);
    expect(component.board.values[3][7]).toEqual(to);
    expect(from['_movable']).toEqual(MovableFigure.Instance);
  });

});

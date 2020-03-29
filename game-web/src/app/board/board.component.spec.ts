import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { PathService } from '../common/path/path.service';
import { BoardService } from './board.service';


describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent],
      providers: [PathService, BoardService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

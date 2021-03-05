import { TestBed } from '@angular/core/testing';
import { BoardService } from './board.service';

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('board init', () => {
    it('should create new board', () => {
      service.initBoard(4);
      expect(service.board.length).toEqual(4);
      expect(service.board[0].length).toEqual(4);
    });

    it('should set the last item to null', () => {
      service.initBoard(4);
      expect(service.board[3][3]).toEqual(null);
    });
  });
});

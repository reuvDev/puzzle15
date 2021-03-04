import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BoardService } from './board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  board = [];
  boardSize = 4;
  clickLog = [];
  private emptyCell = [this.boardSize - 1, this.boardSize - 1];
  private ROW = 0;
  private COL = 1;

  constructor(private readonly boardService: BoardService) {}

  ngOnInit(): void {
    this.board = this.boardService.initBoard(this.boardSize);
  }

  public move(x: number, y: number): void {
    if (this.validMove({ x, y })) {
      this.logMoves({ x, y });
      const tempCell = this.board[x][y];
      this.board[x][y] = null;
      this.board[this.emptyCell[this.ROW]][this.emptyCell[this.COL]] = tempCell;
      this.emptyCell = [x, y];
    }
  }

  private logMoves({ x, y }: ICoordinates): void {
    this.clickLog.push({
      from: { x, y },
      to: {
        x: this.emptyCell[this.ROW],
        y: this.emptyCell[this.COL],
      },
    });
  }

  private validMove({ x, y }: ICoordinates): boolean {
    const isNeighbor =
      Math.abs(this.emptyCell[this.ROW] - x) <= 1 &&
      Math.abs(this.emptyCell[this.COL] - y) <= 1;

    const isNotDiagonalNeighbor =
      Math.abs(this.emptyCell[this.ROW] - x) !==
      Math.abs(this.emptyCell[this.COL] - y);

    return isNeighbor && isNotDiagonalNeighbor;
  }
}

interface ICoordinates {
  x: number;
  y: number;
}

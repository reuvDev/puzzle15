import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ROW_COL, NUMBER_OF_MOVES, DIRECTIONS } from '../model/constant.enum';

interface ICoordinates {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  board = [];
  boardState$ = new BehaviorSubject<number[][]>([]);
  winningState = [];
  size = 0;
  private emptyCell = [];
  private readonly SHUFFLE_ROUNDS = 500;

  constructor() {}

  public initBoard(size: number): void {
    this.board = [];
    this.size = size;
    this.emptyCell = [size - 1, size - 1];
    this.initRows(size);
  }

  public move(x: number, y: number): void {
    if (this.isValidMove({ x, y })) {
      const tempCell = this.board[x][y];
      this.board[x][y] = null;
      this.board[this.emptyCell[ROW_COL.ROW]][
        this.emptyCell[ROW_COL.COL]
      ] = tempCell;
      this.emptyCell = [x, y];
      if (environment.LOG_ENABLED) {
        console.log(this.emptyCell);
      }
      this.boardState$.next(this.board);
    } else {
      console.warn('invalid move');
    }
  }

  public shuffle(): void {
    this.repeatFunctionTimes(
      this.moveRandomDirection.bind(this),
      this.SHUFFLE_ROUNDS
    );
  }

  //#region MoveToDirections
  private moveRandomDirection(): void {
    const randomDirection = Math.floor(
      Math.random() * Math.floor(NUMBER_OF_MOVES)
    );

    const times =
      Math.floor(Math.random() * Math.floor(NUMBER_OF_MOVES - 1)) + 1;
    if (environment.LOG_ENABLED) {
      console.log('direction', DIRECTIONS[randomDirection]);
    }

    switch (randomDirection) {
      case DIRECTIONS.UP: {
        return this.repeatFunctionTimes(this.moveUp.bind(this), times);
      }
      case DIRECTIONS.DOWN: {
        return this.repeatFunctionTimes(this.moveDown.bind(this), times);
      }
      case DIRECTIONS.LEFT: {
        return this.repeatFunctionTimes(this.moveLeft.bind(this), times);
      }
      case DIRECTIONS.RIGHT: {
        return this.repeatFunctionTimes(this.moveRight.bind(this), times);
      }
    }
  }

  private moveUp(): void {
    if (this.emptyCell[ROW_COL.ROW] === 0) {
      return;
    }
    this.move(this.emptyCell[ROW_COL.ROW] - 1, this.emptyCell[ROW_COL.COL]);
  }

  private moveDown(): void {
    if (this.emptyCell[ROW_COL.ROW] === this.size - 1) {
      return;
    }
    this.move(this.emptyCell[ROW_COL.ROW] + 1, this.emptyCell[ROW_COL.COL]);
  }

  private moveLeft(): void {
    if (this.emptyCell[ROW_COL.COL] === 0) {
      return;
    }
    this.move(this.emptyCell[ROW_COL.ROW], this.emptyCell[ROW_COL.COL] - 1);
  }
  private moveRight(): void {
    if (this.emptyCell[ROW_COL.COL] === this.size - 1) {
      return;
    }
    this.move(this.emptyCell[ROW_COL.ROW], this.emptyCell[ROW_COL.COL] + 1);
  }

  //#endregion
  //#region Private Method
  private initRows(size: number): void {
    for (let index = 1; index < size * size; index += size) {
      this.board.push(this.buildColumnsArr(index, size));
    }
    this.board[size - 1][size - 1] = null;
    this.boardState$.next(this.board);
    this.buildWinningState();
  }

  private buildWinningState(): void {
    this.board.forEach((x) => {
      this.winningState.push([...x]);
    });
  }

  private buildColumnsArr(rowRunner: number, size: number): number[] {
    const c = [];
    for (let index = 0; index < size; index++) {
      c.push(rowRunner + index);
    }
    return c;
  }

  private isValidMove({ x, y }: ICoordinates): boolean {
    const isNeighbor =
      Math.abs(this.emptyCell[ROW_COL.ROW] - x) <= 1 &&
      Math.abs(this.emptyCell[ROW_COL.COL] - y) <= 1;

    const isNotDiagonalNeighbor =
      Math.abs(this.emptyCell[ROW_COL.ROW] - x) !==
      Math.abs(this.emptyCell[ROW_COL.COL] - y);

    return isNeighbor && isNotDiagonalNeighbor;
  }

  //#region Helper
  private repeatFunctionTimes(fn: Function, times: number): void {
    while (times) {
      fn();
      --times;
    }
  }
  //#endregion
  //#endregion
}

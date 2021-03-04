import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor() {}

  public initBoard(size: number): number[][] {
    const board = [];

    for (let index = 1; index < size * size; index += size) {
      board.push(this.buildColumnsArr(index, size));
    }

    board[size - 1][size - 1] = null;
    return board;
  }

  private buildColumnsArr(rowRunner: number, size: number): number[] {
    const c = [];
    for (let index = 0; index < size; index++) {
      c.push(rowRunner + index);
    }
    return c;
  }
}

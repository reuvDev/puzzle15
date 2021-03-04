import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  board = [];

  boardSize = 4 * 4;

  public ngOnInit(): void {
    this.initBoard(Math.sqrt(this.boardSize));
  }

  private initBoard(size: number): void {
    this.board = [];

    for (let index = 1; index < this.boardSize; index += size) {
      this.board.push(this.buildColumnsArr(index, size));
    }

    this.board[size - 1][size - 1] = null;
  }

  private buildColumnsArr(rowRunner, size): number[] {
    const c = [];
    for (let index = 0; index < size; index++) {
      c.push(rowRunner + index);
    }
    return c;
  }
}

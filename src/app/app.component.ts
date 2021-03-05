import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  boardSize = 4;
  clickLog = [];
  winningState = [];

  constructor(public readonly boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.initBoard(this.boardSize);
    this.winningState = this.boardService.winningState;
  }

  public move(x: number, y: number): void {
    this.boardService.move(x, y);
  }

  public shuffle(): void {
    this.boardService.shuffle();
  }
}

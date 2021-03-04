import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  board = [];
  boardSize = 4;
  emptyCord = [this.boardSize - 1, this.boardSize - 1];
  constructor(private readonly boardService: BoardService) {}

  public ngOnInit(): void {
    this.board = this.boardService.initBoard(this.boardSize);
  }
}

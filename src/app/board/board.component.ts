import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from './services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() boardSize: number;
  winningState = [];
  constructor(public readonly boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.initBoard(this.boardSize);
    this.winningState = this.boardService.winningState;
  }

  public move({ x, y }: { x: number; y: number }): void {
    this.boardService.move(x, y);
  }

  public shuffle(): void {
    this.boardService.shuffle();
  }
}

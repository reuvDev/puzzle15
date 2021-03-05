import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  @Input() win: boolean;
  @Input() x = 0;
  @Input() y = 0;
  @Input() value: number;
  @Output() oMove = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  public move(): void {
    this.oMove.emit({ x: this.x, y: this.y });
  }
}

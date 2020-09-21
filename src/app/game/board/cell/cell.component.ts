import { Component, Input, OnInit } from '@angular/core';
import { Move } from '../../models/Move';
import { MoveService } from '../../services/move.service';
import { ActivatedRoute } from '@angular/router';
import { MoveFeedService } from '../../services/move-feed.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  @Input() posX: number;
  @Input() posY: number;
  @Input() symbol: string;
  disabled: false;
  moveFeedSubscription: Subscription;
  constructor(
    private moveService: MoveService,
    private route: ActivatedRoute,
    private moveFeedService: MoveFeedService
  ) {
    this.moveFeedSubscription = this.moveFeedService.moveSubject.subscribe(
      (move) => {
        console.log('move received');
        console.log(move);
        if (move.posX == this.posX && move.posY == this.posY)
          this.symbol = move.symbol;
      }
    );
  }

  ngOnInit(): void {}
  onClick() {
    if (!this.symbol) {
      this.symbol = this.moveService.getCurrentSymbol();
      const gameId = this.route.snapshot.params['id'];
      const move = new Move(this.posX, this.posY, this.symbol);
      this.moveService.playMove(gameId, move).subscribe(
        (res) => {
          console.log(res);
        },
        (res) => {
          this.symbol = null;
        }
      );
    }
  }
}

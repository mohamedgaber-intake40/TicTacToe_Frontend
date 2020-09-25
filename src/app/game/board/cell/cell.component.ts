import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Move } from '../../models/Move';
import { MoveService } from '../../services/move.service';
import { ActivatedRoute } from '@angular/router';
import { MoveFeedService } from '../../services/move-feed.service';
import { Subscription } from 'rxjs';
import { GameFinishedFeedService } from '../../services/game-finished-feed.service';

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
  isWinPos;
  isLosePos;
  moveFeedSubscription: Subscription;
  constructor(
    private moveService: MoveService,
    private route: ActivatedRoute,
    private moveFeedService: MoveFeedService,
    private gameFinishedFeedService: GameFinishedFeedService
  ) {
    //TODO uncomment
    this.moveFeedSubscription = this.moveFeedService.moveSubject.subscribe(
      (move) => {
        if (move.posX == this.posX && move.posY == this.posY)
          this.symbol = move.symbol;
      }
    );

    gameFinishedFeedService.gameFinishedSubject.subscribe((res) => {
      // console.log(res.winPos);
      res.winPos.forEach((pos) => {
        if (pos[0] == this.posX && pos[1] == this.posY) {
          if (res.isWinner) {
            this.isWinPos = true;
          } else {
            this.isLosePos = true;
          }
        }
      });
    });
  }

  ngOnInit(): void {}
  onClick() {
    //TODO uncomment
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

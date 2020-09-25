import { Injectable } from '@angular/core';
import { MoveFeedService } from './move-feed.service';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GameFinishedFeedService {
  header: string;
  message: string;
  icon: string = 'pi pi-exclamation-triangle';
  socket;
  channel;
  gameFinishedSubject = new Subject<any>();
  winPos = [];
  isWinner;

  constructor(
    private moveFeedService: MoveFeedService,
    private localStorageService: LocalStorageService
  ) {
    this.socket = moveFeedService.socket;
    this.channel = moveFeedService.channel;
    this.socket
      .join(this.channel)
      .listen('.game.won', (e) => {
        if (localStorageService.getUser().id == e.winner.id) {
          this.message = 'Do u want to play again ?';
          this.header = 'Winner Winner Chicken Dinner';
          this.isWinner = true;
        } else {
          this.message = 'Do u want to play again ?';
          this.header = 'Loser ! stupid ?!!';
          this.isWinner = false;
        }
        this.winPos = e.win_pos;
        this.updateSubject();
      })
      .listen('.game.drawn', (e) => {
        this.message = 'Do u want to play again ?';
        this.header = 'Both Losers ! stupid ?!!';
        this.updateSubject();
      });
  }

  updateSubject() {
    this.gameFinishedSubject.next({
      header: this.header,
      message: this.message,
      icon: this.icon,
      winPos: this.winPos,
      isWinner: this.isWinner,
    });
  }
}

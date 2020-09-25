import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { PlayAgainService } from '../services/play-again.service';
import { GameFinishedFeedService } from '../services/game-finished-feed.service';

@Component({
  selector: 'app-play-again',
  templateUrl: './play-again.component.html',
  styleUrls: ['./play-again.component.css'],
})
export class PlayAgainComponent implements OnInit {
  header: string;
  message: string;
  icon: string;
  constructor(
    private confirmationService: ConfirmationService,
    private playAgainService: PlayAgainService,
    private gameFinishedFeedService: GameFinishedFeedService
  ) {
    gameFinishedFeedService.gameFinishedSubject.subscribe((res) => {
      this.icon = res.icon;
      this.message = res.message;
      this.header = res.header;
      this.confirm();
    });
  }

  ngOnInit(): void {}
  confirm() {
    console.log(this.header);
    this.confirmationService.confirm({
      message: this.header,
      key: 'finished',
      accept: () => {
        //Actual logic to perform a confirmation
        console.log('yes');
      },
    });
  }
}

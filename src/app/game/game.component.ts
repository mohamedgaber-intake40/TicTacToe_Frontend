import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { Game } from './models/Game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  game: Game;
  constructor(private gameService: GameService) {
    this.game = this.gameService.game;
  }

  ngOnInit(): void {}
}

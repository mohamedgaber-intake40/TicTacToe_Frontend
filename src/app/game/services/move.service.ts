import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Move } from '../models/Move';
import { LocalStorageService } from '../../services/local-storage.service';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private gameService: GameService
  ) {}

  playMove(gameId, move: Move) {
    const data = {
      pos_x: move.posX,
      pos_y: move.posY,
      symbol: move.symbol,
    };
    return this.httpClient.post(`api/games/${gameId}/moves`, data).pipe(
      map((res) => {
        return Move.create(res);
      })
    );
  }

  getCurrentSymbol() {
    const currentUser = this.localStorageService.getUser();
    const game = this.gameService.game;
    if (currentUser.id == game.firstPlayer.id) {
      return game.firstPlayer.symbol;
    }
    return game.secondPlayer.symbol;
  }
}

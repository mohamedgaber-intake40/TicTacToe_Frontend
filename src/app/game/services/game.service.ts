import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/Game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public game: Game;
  constructor(private httpClient: HttpClient) {}

  createGame(secondPlayer): Observable<any> {
    const data = {
      second_player: secondPlayer,
    };
    return this.httpClient.post('api/games', data);
  }
}

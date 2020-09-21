import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Move } from '../models/Move';

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  constructor(private httpClient: HttpClient) {}

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
}

import { Injectable } from '@angular/core';
import { SocketsService } from '../../services/sockets.service';
import { GameService } from './game.service';
import { Subject } from 'rxjs';
import { Move } from '../models/Move';
import { MoveService } from './move.service';

@Injectable({
  providedIn: 'root',
})
export class MoveFeedService {
  socket;
  channel;
  moveSubject = new Subject<Move>();
  currentSymbol;
  constructor(
    private socketsService: SocketsService,
    private gameService: GameService,
    private moveService: MoveService
  ) {
    this.socket = this.socketsService.echo;
    this.channel = `game.${this.gameService.game.id}`;
    this.currentSymbol = this.moveService.getCurrentSymbol();
    this.socket.join(this.channel).listen('.move.played', (e) => {
      if (e.move.symbol != this.currentSymbol) {
        this.moveSubject.next(Move.create(e.move));
      }
    });
  }
}

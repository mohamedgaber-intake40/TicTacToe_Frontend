import { Injectable } from '@angular/core';
import { SocketsService } from './sockets.service';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GameNotification, Notification } from '../Models/Notification';
import { Game } from '../game/models/Game';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  socket;
  invitationSubject = new Subject<Notification>();
  acceptInvitationSubject = new Subject<Notification>();
  gameSubject = new Subject<GameNotification>();

  constructor(
    private socketsService: SocketsService,
    private localStorageService: LocalStorageService,
    private httpClient: HttpClient
  ) {
    this.socket = socketsService.echo;
    const user = this.localStorageService.getUser();
    if (user) {
      this.socket.private(`user.${user.id}`).notification((notification) => {
        // console.log(notification);
        const notificationObj = new Notification(
          notification.user,
          notification.type
        );
        console.log(notificationObj);
        if (notificationObj.type == 'invite.notification') {
          this.invitationSubject.next(notificationObj);
        }

        if (notificationObj.type == 'accept.invite.notification') {
          this.acceptInvitationSubject.next(notificationObj);
        }

        if (notificationObj.type == 'game.notification') {
          const gameNotification = new GameNotification(
            notificationObj.user,
            notificationObj.type,
            Game.create(notification.game)
          );
          this.gameSubject.next(gameNotification);
        }
      });
    }
  }
  //
  invitePlayer(id) {
    this.httpClient.get(`api/invite/${id}`).subscribe((res) => {
      // console.log(res);
    });
  }
}

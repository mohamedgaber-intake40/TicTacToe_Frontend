import { Injectable } from '@angular/core';
import { SocketsService } from './sockets.service';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import {Notification} from '../Models/Notification'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  socket;
  invitationSubject = new Subject<Notification>();
  constructor(private socketsService: SocketsService, private localStorageService: LocalStorageService, private httpClient: HttpClient) {
    this.socket = socketsService.echo;
    const user = this.localStorageService.getUser();
    if (user) {
      this.socket
        .private(`user.${user.id}`)
        .notification(notification => {
          console.log(notification);
          const notificationObj = new Notification(notification.user,notification.type);
          console.log(notificationObj);
          if(notificationObj.type =="invite.notification"){
            this.invitationSubject.next(notificationObj)
          }
        });
    }
  }

  invitePlayer(id) {
    this.httpClient.get(`api/invite/${id}`).subscribe(res => {
      // console.log(res);
    });
  }
}

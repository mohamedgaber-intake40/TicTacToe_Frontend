import { Injectable } from '@angular/core';
import {SocketsService} from './sockets.service';
import {LocalStorageService} from './local-storage.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  socket;
  constructor(private socketsService:SocketsService,private localStorageService:LocalStorageService,private httpClient:HttpClient) {
    this.socket = socketsService.echo;
    const user = this.localStorageService.getUser();
    this.socket
      .private(`user.${user.id}`)
      .notification(notification=>{
      console.log(notification);
    })
  }

    invitePlayer(id)
  {
    this.httpClient.get(`api/invite/${id}`).subscribe(res=>{
      // console.log(res);
    });
  }
}

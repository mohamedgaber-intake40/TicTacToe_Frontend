import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  user;
  echo;
  constructor(private localStorageService: LocalStorageService) {
    this.user = this.localStorageService.getUser();
    window['pusher'] = Pusher;
    if (this.user) {
      this.echo = new Echo({
        broadcaster: 'pusher',
        key: 'ABCDEFGH',
        cluster: 'mt1',
        forceTLS: false,
        authEndpoint: 'api/broadcasting/auth',
        auth: {
          headers: {
            Authorization: "Bearer " + this.user.token.access_token,
            Accept: 'Application/json'
          }
        },
        wsHost: '127.0.0.1',
        wsPort: 6001,
        disableStats: false,
      });
    }

  }
}

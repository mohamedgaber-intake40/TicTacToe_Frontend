import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged;
  title = 'TicTacToe-frontend';
  constructor(private localStorageService: LocalStorageService, private notificationService: NotificationService) {
    this.isLogged = localStorageService.isLogged();
    this.localStorageService.subject.subscribe(res => {
      this.isLogged = localStorageService.isLogged();
    })
  }
}

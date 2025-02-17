import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../Auth/Models/user';
import { LogoutService } from '../Auth/services/logout.service';
import { SidebarService } from '../online/services/sidebar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  user: User;
  constructor(
    private localStorageService: LocalStorageService,
    private logoutService: LogoutService,
    private sidebarService: SidebarService
  ) {
    this.localStorageService.subject.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.user = this.localStorageService.getUser();
  }
  onLogout(e) {
    e.preventDefault();
    this.logoutService.logout();
    // this.ngOnInit();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}

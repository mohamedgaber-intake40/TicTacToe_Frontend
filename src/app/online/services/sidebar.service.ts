import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public status = false;
  public statusSubject = new Subject<boolean>();
  constructor() {}

  toggleSidebar() {
    console.log(this.status);
    this.status = !this.status;
    this.statusSubject.next(this.status);
  }
}

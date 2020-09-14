import { Injectable } from '@angular/core';
import {User} from '../../Auth/Models/user';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {
  onlineUsers : User[] = [];
   subject = new Subject<any>();
  constructor() { }
}

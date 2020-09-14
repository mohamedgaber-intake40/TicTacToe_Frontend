import { Injectable } from '@angular/core';
import {User} from '../Auth/Models/user';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  subject : Subject<User>;
  constructor() {
    this.subject=new Subject<User>();
  }

   setUser(user:User)
  {
    localStorage.setItem('user',JSON.stringify(user));
    this.subject.next(user)
  }

   getUser():User
  {
    let user = localStorage.getItem('user');
    if(user){
    user = JSON.parse(user);
    return  User.createUser(user,true);
    }
  }

  clear()
  {
    localStorage.clear();
    this.subject.next(null)
  }

  isLogged()
  {
    let user = localStorage.getItem('user');
    if(user) {
      user = JSON.parse(user);
      return true;
    }
    return false;
  }
}

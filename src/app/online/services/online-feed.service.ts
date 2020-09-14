import { Injectable } from '@angular/core';

import {SocketsService} from '../../services/sockets.service';
import {OnlineService} from './online.service';
import {User} from '../../Auth/Models/user';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineFeedService {
  private socket;
  constructor(private socketsService:SocketsService,private onlineService :OnlineService) {
    this.socket = this.socketsService.echo;
    this.socket
        .join('online-channel')
        .here(users=>{
            console.log("here fired");
            // console.log(users);
            onlineService.onlineUsers = User.createUsers(users);
            this.onlineService.subject.next(true);
        }).joining(joiningUser=>{
          console.log('joining fired');
            const user = User.createUser(joiningUser,false);
            console.log(user);
            onlineService.onlineUsers.push(user);
            this.onlineService.subject.next(true);
        }).leaving(user=>{
        console.log("leaving fired");
        // console.log(user);
        this.removeLeavingUser(user);
            this.onlineService.subject.next(true);
        })
        .listen('.user.logged.in',e =>{
            console.log("listen fired");
            const user = User.createUser(e.user,false);
            onlineService.onlineUsers.push(user);
            this.onlineService.subject.next(true);
        });
  }

  removeLeavingUser(leavingUser)
  {
       this.onlineService.onlineUsers = this.onlineService.onlineUsers.filter(user=>{
          return user.id !=leavingUser.id;
      })
  }
}

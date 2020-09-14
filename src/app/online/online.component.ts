import {Component, OnDestroy, OnInit} from '@angular/core';
import {OnlineFeedService} from './services/online-feed.service';
import {User} from '../Auth/Models/user';
import {OnlineService} from './services/online.service';
import {Subscription} from 'rxjs';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit,OnDestroy {
  onlineUsers: User[] = [];
  current_user :User;
  onlineServiceSubjectSubscription :Subscription;
  constructor(private onlineFeedService:OnlineFeedService,private onlineService:OnlineService , private localStorageService:LocalStorageService) {

    this.onlineServiceSubjectSubscription = this.onlineService.subject.subscribe(res=>{
      this.onlineUsers=this.onlineService.onlineUsers;
    });

    this.current_user = this.localStorageService.getUser();
  }

  ngOnInit(): void {
    // console.log(this.onlineUsers);
    // this.onlineUsers = this.onlineService.onlineUsers;
  }

  ngOnDestroy(): void {
    this.onlineServiceSubjectSubscription.unsubscribe();
  }

  filterOnlineUsers()
  {
    return this.onlineUsers.filter(user=>{
      return user.id != this.current_user.id;
    });
  }



}

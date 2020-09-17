import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private httpClient:HttpClient) {
  }
  acceptInvitaion(){
    this.httpClient.get('invite/{user}/accept').subscribe(res=>{});
  }
}

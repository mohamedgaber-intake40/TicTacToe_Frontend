import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  logoutUrl = '/api/logout';
  constructor(private httpClient:HttpClient , private localStorageService :LocalStorageService,private router:Router) { }

  logout()
  {
    this.httpClient.delete(this.logoutUrl).subscribe(res=>{
      this.localStorageService.clear();
      this.router.navigateByUrl('/');
    },res=>{

    });

  }
}

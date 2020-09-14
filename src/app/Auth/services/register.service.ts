import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../Models/user';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerUrl = '/api/register';
  constructor(private httpClient :HttpClient , private localStorageService:LocalStorageService,private router:Router) { }

  register(data)
  {
    this.httpClient.post(this.registerUrl,data).subscribe(
        res=>{
            const user = User.createUserFromResponse(res);
            this.localStorageService.setUser(user);
            this.router.navigateByUrl('/');
        },res=>{

       });
  }
}

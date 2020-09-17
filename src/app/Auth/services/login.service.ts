import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = '/api/login';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private router: Router) {
  }

  login(email: string, password: string) {
    const body = {
      'email': email,
      'password': password,
      'device_name': 'web'
    };
    this.httpClient.post(this.loginUrl, body).subscribe(res => {
      const user = User.createUserFromResponse(res);
      this.localStorageService.setUser(user);
      this.router.navigateByUrl('/');
    }, res => {

    });

  }
}

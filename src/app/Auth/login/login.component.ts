import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private loginService: LoginService) {

  }

  ngOnInit(): void {
  }
  onSubmit(e) {
    e.preventDefault();
    this.loginService.login(this.email, this.password);
  }


}

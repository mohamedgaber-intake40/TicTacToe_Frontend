import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:string;
  email:string;
  password:string;
  passwordConfirm:string;
  constructor(private registerService:RegisterService) { }

  ngOnInit(): void {
  }
  onSubmit(e)
  {
    e.preventDefault();
    if(this.validatePasswordConfirmation())
    {
      const data = {
        name:this.name,
        email:this.email,
        password:this.password,
        password_confirmation : this.passwordConfirm,
        device_name:'web'
      };
      this.registerService.register(data)
    }

  }

  validatePasswordConfirmation()
  {
    return this.password == this.passwordConfirm;
  }
}

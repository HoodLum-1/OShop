import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: AuthService) { 
  }

  login() { 
    this.auth.login();
  }

  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.auth.signInUser(email, password);
  }
}

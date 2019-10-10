import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService ) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    this.auth.signupUser(name, email, password);
  }

}

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private http: Http, private authService: AuthService) { }

  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password).subscribe(
      (response) => {
        console.log(response)
        //console.log('Logged in successfully') Navigate to cart upon successful login, clear form upon unsuccessful login
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
  }

}

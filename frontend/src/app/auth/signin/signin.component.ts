import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  resText: string = '';
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    
    this.authService.signinUser(email, password).subscribe(
      (response) => {
        //console.log('Response -> '+response);
        if(response['success']){
          //console.log(response);
          this.isLoggedIn = true;
          this.router.navigate(['/']);
        }
        else{
          this.resText = "Login unsuccessful. Please try again";
        }
        //console.log('Logged in successfully') Navigate to cart upon successful login, clear form upon unsuccessful login
      },
      (error) => {
        var res = JSON.parse(error['_body']);
        this.resText = res['message'] + " Please try again";
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private http: Http, private authService: AuthService, private router: Router) { 
    
  }

  onSignup(form: NgForm){
    if(form.value.password == form.value.password_confirmation){
      const email = form.value.email;
      const password = form.value.password;
      const first_name = form.value.first_name;
      const last_name = form.value.last_name;
         
      this.authService.signupUser(email, password, first_name, last_name).subscribe(
        (response) => console.log(response),
        (error) => {
          console.log(error)
          //this.router.navigate(['error'])
        }
      );
    }
    else{
      console.log("Passwords don't match");
    }
  }

  ngOnInit() {
  }
}
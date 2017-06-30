import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  resText: string = 'Fill up the form completely and then submit';
  passText: string = '';
  finText: string = '';

  constructor(private authService: AuthService, private router: Router) { 
    
  }

  onSignup(form: NgForm){
    if(form.value.password == form.value.password_confirmation){
      const email = form.value.email;
      const password = form.value.password;
      const first_name = form.value.first_name;
      const last_name = form.value.last_name;
         
      this.authService.signupUser(email, password, first_name, last_name).subscribe(
        (response) => {
          var res = JSON.parse(response['_body']);
          if(res['success']){
          this.router.navigate(['signin'])
          }
          else{
            console.log("Else " +response)
            this.finText = response['message'] + " Please try again!"
            //form.reset()
          }
        },
        (error) => {
          //console.log(JSON.parse(error['_body']));
          var res = JSON.parse(error['_body']);
          //console.log('error res: ' + res['message']);

          this.finText = res['message'] + " Please try again!"
          //form.reset();
          //this.router.navigate(['error'])
        }
      );
    }
    else{
      this.passText = "Passwords don't match. Please try again!"
    }
  }

  ngOnInit() {
  }
}
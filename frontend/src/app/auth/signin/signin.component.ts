import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  resText: string = '';
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router, private userService: UserService,
  private slService: ShoppingListService) { }
  spanText: string = '';
  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    
    this.authService.signinUser(email, password).subscribe(
      (response) => {
        //console.log('Response -> '+response);
        if(response['success']){
          //console.log(response);
          this.isLoggedIn = true;
          this.slService.onLoggedIn();
          if(this.userService.getReturnUrl() == 'cart'){
            this.router.navigate(['cart']);
          }
          else{
            this.router.navigate(['/']);
          }
          
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
    if(this.userService.getReturnUrl() == 'signup'){
      this.spanText = 'User has been successfully registered. Please login to continue shopping'
    }
  }

}

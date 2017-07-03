import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { UserModel } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = new UserModel('','','','');
  fn: string;
  ln: string;
  email: string;
  constructor(private router: Router, private http: Http, private userService: UserService) { }
  ngOnInit() {
    this.userService.getUser().subscribe(
      (response) => {
        if(response['success']){
          var res = response.user_details;
          //console.log(res, typeof(res));
          this.user = new UserModel(res['first_name'], res['last_name'], res['email_id'], '');
          this.fn = this.user.first_name;
          this.ln = this.user.last_name;
          this.email = this.user.email;
        }
    },
      (error) => {console.log(error)}
    );
  }

  //Assuming user has the contents received from the backend, this should work. TO BE TESTED
  resText = '';
  onEditProfile(form: NgForm){
    //console.log('Logging on edit profile:   '+form.value.first_name);
    //console.log('fn+ln+email+++'+this.fn, this.ln, this.email);
    if(form.value.first_name){
      this.fn = form.value.first_name;
    }

    if(form.value.last_name){
      this.ln = form.value.last_name;
    }

    if(form.value.email){
      this.email = form.value.email;
    }
    if(form.value.password == form.value.password_confirmation){
    
      const user = new UserModel(this.fn, this.ln, this.email, form.value.password);
      //console.log('user' + user.email);
      this.userService.editProfile(user).subscribe(
        (response) =>{
          console.log(response)
          if(response['success']){
            this.resText = "Profile updated successfully";
          }
        },
        (error) => console.log(error)
      );
      //this.router.navigate(['/']);
    }
    else{
      this.resText = "Passwords don't match! Please try again!"
    }
  }

  onCancel(){
    this.router.navigate(['/']);
  }

  onAddAddress(){
    this.router.navigate(['/address-edit']);
  }

}

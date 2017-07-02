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
  constructor(private router: Router, private http: Http, private userService: UserService) { }
  ngOnInit() {
    this.userService.getUser().subscribe(
      (response) => {
        if(response['success']){
          var res = response.user_details;
          console.log(res, typeof(res));
          this.user = new UserModel(res['first_name'], res['last_name'], res['email_id'], '');

        }
    },
      (error) => {console.log(error)}
    );
  }

  //Assuming user has the contents received from the backend, this should work. TO BE TESTED
  resText = '';
  fn: string = this.user['first_name'];
  ln: string = this.user['last_name'];
  email: string = this.user['email'];
  onEditProfile(form: NgForm){
    console.log(form.value.first_name);
    if(form.value.first_name){
      this.fn = form.value.first_name;
    }

    if(form.value.last_name){
      this.ln = form.value.last_name;
    }

    if(form.value.email){
      this.email = form.value.email;
    }
    
    const user = new UserModel(this.fn, this.ln, this.email, form.value.password);
    console.log(user);
    this.userService.editProfile(user).subscribe(
      (response) =>{
        console.log(response)
        if(response['success']){
          this.resText = "Profile updated successfully";
        }
      },
      (error) => console.log(error)
    );
    this.userService.setAddress(form.value.addressId, form.value.addressLine1, form.value.addressLine2, form.value.city, form.value.state, form.value.zipcode, form.value.phone);
    this.router.navigate(['/']);
  }

  onCancel(){
    this.router.navigate(['/']);
  }

  onAddAddress(){
    this.router.navigate(['/address-edit']);
  }

}

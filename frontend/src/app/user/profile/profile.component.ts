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

  constructor(private router: Router, private http: Http, private userService: UserService) { }

  ngOnInit() {
  }

  

  onEditProfile(form: NgForm){
    const user = new UserModel(form.value.first_name, form.value.last_name, form.value.email, form.value.password);
    console.log(user);
    this.userService.editProfile(user).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    //this.http.post('http://localhost:3000/profile', user);
    this.router.navigate(['/cart']);
  }

  onCancel(){
    this.router.navigate(['/']);
  }

}

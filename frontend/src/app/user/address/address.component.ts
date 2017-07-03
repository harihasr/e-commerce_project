import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddressModel } from './address.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addresses: AddressModel[] = [];
  
  //address = new AddressModel('3207 Jefferson Avenue', '#2', 'Cincinnati', 'Ohio', '45220', '5135135133');
  //token = '';
  constructor(private userService: UserService, private router: Router, private http: Http) { }
  ngOnInit() {
     this.userService.getAddress().subscribe(
       (response) => {
        if(response['success']){
          var responses = response.address;
          for (var res in responses) {
          const temp = new AddressModel(res['address_id'], res['address_line1'], res['address_line2'], res['city'], res['state'], res['zipcode'], res['phone']);
          this.addresses.push(temp);  
          //Assuming the response is an array of objects. Has to be tested!
          }
        }
      },
       (error) => console.log(error)
     );
     //const temp = new AddressModel('3207 Jefferson Avenue', '#2', 'Cincinnati', 'Ohio', '45220', '5135135133');
     //this.address.push(temp);

  }

  onEditAddress(form: NgForm){
    //if(this.addresses['address_id'] == address_id){
      //tempAddress = new AddressModel(this)
      //JSON Querying is an issue. Also, address_id has to be passed to address_edit component.
      let temp = new AddressModel(form.value.address_id, form.value.address_line1, form.value.address_line2, form.value.city, form.value.state, form.value.zipcode, form.value.phone);
      this.userService.editAddress(temp);
    }
}

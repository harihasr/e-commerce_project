import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddressModel } from './address.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  address: AddressModel[] = [];
  
  //address = new AddressModel('3207 Jefferson Avenue', '#2', 'Cincinnati', 'Ohio', '45220', '5135135133');
  //token = '';
  constructor(private userService: UserService, private router: Router) { }
  addressId: number;
  ngOnInit() {
     this.userService.getAddress().subscribe(
       (response) => {
        if(response['success']){
          var res = JSON.parse(response['message']);
          this.addressId = res['address_id'];
          const temp = new AddressModel(res['address_line1'], res['address_line2'], res['city'], res['state'], res['zipcode'], res['phone']);
          this.address.push(temp);
        }
      },
       (error) => console.log(error)
     );
     //const temp = new AddressModel('3207 Jefferson Avenue', '#2', 'Cincinnati', 'Ohio', '45220', '5135135133');
     //this.address.push(temp);

  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddressModel } from '../address/address.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onAddAddress(form: NgForm){
    const address = new AddressModel(form.value.addressLine1, form.value.addressLine2, form.value.city, form.value.state, form.value.zipcode, form.value.phone);
    this.userService.setAddress(address).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onCancel(){
    this.router.navigate(['/profile']);
  }

}

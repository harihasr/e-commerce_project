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
  private address: AddressModel[] = [];
  
  //address = new AddressModel('3207 Jefferson Avenue', '#2', 'Cincinnati', 'Ohio', '45220', '5135135133');
  userId: number = 1;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
     console.log(this.userService.getAddress(this.userId));
     const temp = new AddressModel('3207 Jefferson Avenue', '#2', 'Cincinnati', 'Ohio', '45220', '5135135133');
     this.address.push(temp);

  }

}

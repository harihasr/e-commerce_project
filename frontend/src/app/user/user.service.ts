import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { Http, Response, Headers } from '@angular/http';
import { AddressModel } from './address/address.model';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService{
    user: UserModel[] = [];
    address: AddressModel[] = [];

    //urlString: string = 'http://192.168.200.47:3000';
    urlString: string = 'http://localhost:3000';

    constructor(private http: Http){

    }
    
    getUser(){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        return this.http.get(this.urlString+'/user/profile', {headers: headers}).map(this.extractData);
    }

    editProfile(user: UserModel){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        return this.http.put(this.urlString+'/user/profile',{'first_name':user.first_name, 'last_name': user.last_name, 'email_id':user.email, 'password':user.password}, {headers: headers}).map(this.extractData);
    }

    getAddress(){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
       return this.http.get(this.urlString+'/user/address', {headers: headers}).map(this.extractData);
    }

    editAddress(address: AddressModel){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        return this.http.put(this.urlString+'/user/address', {'address_id':address.address_id, 'address_line1':address.address_line1, 'address_line2': address.address_line2, 'city':address.city, 'state':address.state, 'zip_code':address.zipcode, 'phone':address.phone}, {headers: headers}).map(this.extractData);
    }

    extractData(res: Response){
        let body = res.json();
        //console.log(body);
        return body;
    }


    setAddress(address: AddressModel){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        return this.http.post(this.urlString+'/user/address', {'address_id':address.address_id, 'address_line1':address.address_line1, 'address_line2': address.address_line2, 'city':address.city, 'state':address.state, 'zip_code':address.zipcode, 'phone':address.phone}, {headers: headers}).map(this.extractData);
    }
}
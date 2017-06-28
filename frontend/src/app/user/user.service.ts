import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { Http, Response } from '@angular/http';
import { AddressModel } from './address/address.model';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService{
    user: UserModel[] = [];
    address: AddressModel[] = [];

    urlString: string = 'http://192.168.200.47:3000';

    constructor(private http: Http){

    }

    getUser(userId: number){
        return this.http.get(this.urlString+'/profile', userId).map(this.extractData);
    }

    editProfile(user: UserModel){
        return this.http.post(this.urlString+'/profile',user);
    }

    getAddress(userId: number): Observable<AddressModel[]>{
       return this.http.get(this.urlString+'/address', userId).map(this.extractData);
    }

    extractData(res: Response){
        let body = res.json();
        return body.data || { };
    }


    setAddress(address: AddressModel){
        return this.http.post(this.urlString+'/address', address);
    }


}
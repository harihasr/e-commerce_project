import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService{
    constructor(private http: Http){
        
    }

    //urlString: string = 'http://192.168.200.47:3000';
    urlString: string = 'http://localhost:3000';

    signinUser(email: string, password: string){
        console.log(email, password);
        return this.http.post(this.urlString+'/user/login', [email, password]).map(this.extractData);
    }

    extractData(res: Response){
        let body = res.json();
        console.log("Extract Data "+body['csrfToken']);
        return body['csrfToken'];
    }

    getToken(){
        return this.http.get(this.urlString+'/user/register').map(this.extractData);
    }

    signupUser(email: string, password: string, first_name: string, last_name: string, csrfToken: string){
        console.log(first_name, last_name, email, password);
        return this.http.post(this.urlString+'/user/register', [first_name, last_name, email, password, csrfToken]);
    }

    isSignedIn(){
        return false;
    }
}
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
//import {Headers} from 'angular2/http';

@Injectable()
export class AuthService{
    constructor(private http: Http){
        
    }
    urlString: string = 'http://192.168.200.47:3000';
    //urlString: string = 'http://localhost:3000';

    signinUser(email: string, password: string){
        console.log(email, password);
        return this.http.post(this.urlString+'/user/signin', {'email': email, 'password': password}).map(this.extractSignInData);
    }

    extractSignInData(res: Response){
        let body = res.json();
        let headers = res.headers;
        localStorage.setItem('token', body['token']);
        return body;
    }

    extractData(res: Response){
        let body = res.json();
        return body;
    }

    signupUser(email: string, password: string, first_name: string, last_name: string){
        console.log(first_name, last_name, email, password);
        return this.http.post(this.urlString+'/user/signup', {'first_name': first_name, 'last_name': last_name, 'email':email, 'password':password});
        // .catch(
        // (error: Response)=> {
        //     //console.log(error['_body']);
        //     return Observable.throw(error['_body']);
        // }            
        // );
    }

    isAuthenticated(){
        //console.log('isAuthenticated:  '+localStorage.getItem('token'));
        if(localStorage.getItem('token')!=null){
            return true;
        }
        return false;
    }

    logout(){
        //console.log('Logging out');
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        localStorage.removeItem('token');
        this.http.get(this.urlString+'/user/logout', {headers: headers});
    }
}
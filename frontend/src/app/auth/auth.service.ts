import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
    constructor(private http: Http){
        
    }

    signinUser(email: string, password: string){
        console.log(email, password);
        this.http.post('http://localhost:3000/login', [email, password]);
    }

    signupUser(email: string, password: string, first_name: string, last_name: string){
        console.log(first_name, last_name, email, password);
        this.http.post('http://localhost:3000/register', [first_name, last_name, email, password]);
    }

    isSignedIn(){
        return false;
    }
}
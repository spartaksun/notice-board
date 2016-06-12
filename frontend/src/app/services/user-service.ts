import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";

export class User {
    constructor(
                public username:string,
                public token: string,
                public password?:string,
                public email?:string) {
    }
}

@Injectable()
export class UserService {

    user: Object;

    constructor(private http: Http) {
        this.user = JSON.parse(localStorage.getItem('profile'));
    }

    public login(username: string, password: string): Observable <User> {
        console.log('username: ' + username + ' password: ' + password);

        return this.http.post('/api/login_check', JSON.stringify({
            'username': username,
            'password': password
        }), { headers: new Headers({ 'Content-Type': 'application/json' }) })
            .map(data => data.json());            
    }

    public logout() {
        localStorage.removeItem('id_token');
    }

    public static authenticated() {
        return tokenNotExpired();
    }
    
    public register(username: string, email: string, password: string) {
        console.log('Register ' + username + email + password);
        
        return this.http.post('/api/users', JSON.stringify({
            'user': {
                'username': username,
                'plainPassword': password,
                'email': email
            }
        }), { headers: new Headers({ 'Content-Type': 'application/json' }) })
            .map(data => data.json());
    }
}
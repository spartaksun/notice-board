import {Injectable} from '@angular/core';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {Http, Headers} from "@angular/http";

@Injectable()
export class Auth {

    user: Object;

    constructor(private http: Http, private authHttp: AuthHttp) {
        this.user = JSON.parse(localStorage.getItem('profile'));
    }

    public login() {
        let username = 'user';
        let password = 'password';


        this.http.post('/api/login_check', JSON.stringify({
            'username': username,
            'password': password
        }), { headers: new Headers({ 'Content-Type': 'application/json' }) })
            .map(data => data.json())
            .subscribe(
            data => localStorage.setItem('id_token', data.token),
            err => console.log(err),
            () => console.log('Request Complete')
        );

        //
        // localStorage.setItem('profile', JSON.stringify(profile));
        // localStorage.setItem('id_token', token);
    }

    public static authenticated() {
        return tokenNotExpired();
    }
}
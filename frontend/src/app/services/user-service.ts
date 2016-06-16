import {Injectable, BaseException} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {AuthService} from "./auth-service";

export class User {
    constructor(public username:string,
                public password?:string,
                public email?:string,
                public token?:string) {
    }
}

@Injectable()
export class UserService {

    constructor(private http:Http, private authService: AuthService) {
    }

    public login(user:User, onSuccess:(user:User) => any, onError:(error:Response)=> any) {
        this.getLoggedIn(user.username, user.password)
            .subscribe(
                (userData:any) => {
                        this.authService.user = user;
                        return onSuccess(user);

                }, (error:Response) => {
                    return onError(error);
                });
    }

    public register(user:User, onSuccess:(user:User) => any, onError:(error:Response)=> any) {
        this.getRegistered(user.username, user.email, user.password)
            .subscribe(
                (user:User) => {
                    return onSuccess(user);
                }, (error:Response) => {
                    return onError(error);
                });
    }

    public static authenticated() {
        return tokenNotExpired();
    }

    private getRegistered(username:string, email:string, password:string):Observable <User> {
        return this.http.post('/api/users', JSON.stringify({
            'user': {
                'username': username,
                'plainPassword': password,
                'email': email
            }
        }), {headers: new Headers({'Content-Type': 'application/json'})})
            .map(data => data.json());
    }

    private getLoggedIn(username:string, password:string):Observable <User> {
        return this.http.post('/api/login_check', JSON.stringify({
            'username': username,
            'password': password
        }), {headers: new Headers({'Content-Type': 'application/json'})})
            .map(data => data.json());
    }

}
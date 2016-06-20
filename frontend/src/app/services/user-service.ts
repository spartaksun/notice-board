import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {AuthService} from "./auth-service";
import {AuthHttp} from 'angular2-jwt/angular2-jwt';

export class User {
    constructor(public username:string,
                public password?:string,
                public email?:string,
                public token?:string) {
    }
}

@Injectable()
export class UserService {

    constructor(private http:Http, private authHttp:AuthHttp, private authService:AuthService) {
    }

    public login(user:User, onSuccess:(user:User) => any, onError:(error:Response)=> any) {
        this.getLoggedIn(user.username, user.password)
            .subscribe(
                (userData:any) => {
                    this.authService.user = user;
                    localStorage.setItem('id_token', userData.token);
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

    public authenticated() {
        return tokenNotExpired();
    }

    public myProfile(onSuccess:(user:User) => any, onError:(error:Response)=> any) {
        return this.authHttp.get('/api/profile', {headers: new Headers({'Content-Type': 'application/json'})})
            .map(data => data.json())
            .subscribe(
                (user:User) => {
                    return onSuccess(user);
                }, (error:Response) => {
                    return onError(error);
                });
    }

    public user(userId: number, onSuccess:(user:User) => any, onError:(error:Response)=> any) {
        return this.http.get('/api/users/' + userId, {headers: new Headers({'Content-Type': 'application/json'})})
            .map(data => data.json())
            .subscribe(
                (user:User) => {
                    return onSuccess(user);
                }, (error:Response) => {
                    return onError(error);
                });
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
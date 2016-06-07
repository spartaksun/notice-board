import {Injectable} from '@angular/core';
import {UserService, User} from "./user-service";
import {Router} from "@angular/router";

@Injectable()
export class LoginService {
    
    public user = new User('', '');
    
    constructor(private userService: UserService, private router: Router) {}
    
    login(username: string, password: string){
        this.userService.login(username, password)
            .subscribe(
                user => {
                    this.user = user;
                    localStorage.setItem('id_token', user.token);
                    this.router.navigateByUrl('/');
                },
                err => console.log(err),
                () => console.log('Request Complete')
            );
    }
}
import {Component} from "@angular/core";
import {TitleService} from "../../../services/title-service";
import {UserService, User} from "../../../services/user-service";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {Response} from "@angular/http";
import {
    FORM_DIRECTIVES,
    Validators,
    Control,
    ControlGroup,
} from '@angular/common';


@Component({
    template: require('./index.html'),
    directives: [
        FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
    ]
})

export class LoginComponent {

    public formModel:ControlGroup;
    public username:string;
    public formErrors:string;

    constructor(private userService:UserService,
                private titleService:TitleService,
                private router:Router) {

        this.formModel = new ControlGroup({
            'username': new Control('', Validators.required),
            'password': new Control('', Validators.required)
        });
        this.titleService.title = 'Login';
    }

    public onLogin() {
        this.userService.login(
            new User(this.formModel.value.username, this.formModel.value.password),
            (user:User) => {
                localStorage.setItem('id_token', user.token);
                this.router.navigateByUrl('/');
            },
            (err:Response) => {
                this.formErrors = err.json().message;
            }
        );
    }

    get value():string {
        return JSON.stringify(this.formModel.value, null, 2);
    }
}
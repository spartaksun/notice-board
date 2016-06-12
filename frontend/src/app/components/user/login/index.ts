import {Component} from "@angular/core";
import {TitleService} from "../../../services/title-service";
import {UserService} from "../../../services/user-service";
import {Router} from "@angular/router";
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
        FORM_DIRECTIVES
    ]
})

export class LoginComponent {

    public formModel:ControlGroup;
    public username:string;
    public formErrors:string;

    constructor(private userService:UserService,
                private titleService:TitleService,
                private router: Router) {

        this.formModel = new ControlGroup({
            'username': new Control('', Validators.required),
            'password': new Control('', Validators.required)
        });
        this.titleService.title = 'Login';
    }

    public onLogin() {
        let username = this.formModel.value.username;
        let password = this.formModel.value.password;
        this.userService.login(username, password)
            .subscribe(
                user => {
                    localStorage.setItem('id_token', user.token);
                    this.router.navigateByUrl('/');
                },
                (err: Response) => {
                    this.formErrors = err.json().message;
                },
                () => console.log('Request Complete')
            );
    }

    get value():string {
        return JSON.stringify(this.formModel.value, null, 2);
    }
}
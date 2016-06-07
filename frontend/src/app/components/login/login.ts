import {Component} from "@angular/core";
import {
    Validators, FORM_DIRECTIVES, ControlGroup, Control
} from '@angular/common';
import {LoginService} from "../../services/login-service";

@Component({
    template: require('./login.html'),
    directives: [
        FORM_DIRECTIVES
    ],
    styles: [require('./login-form.css')]
})

export class LoginComponent {

    public formModel: ControlGroup;
    public username: string;

    constructor(private loginService: LoginService) {

        this.formModel = new ControlGroup({
            'username': new Control('', Validators.required),
            'password': new Control('', Validators.required)
        });
    }

    public onLogin()
    {
        this.loginService.login(this.formModel.value.username, this.formModel.value.password)
    }

    get value(): string {
        return JSON.stringify(this.formModel.value, null, 2);
    }
}
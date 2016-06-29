import {Component} from "@angular/core";
import {TitleService} from "../../services/title-service";
import {UserService, User} from "../../services/user-service";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {Response} from "@angular/http";
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';
import {FlashBagService} from "../../services/flash-bag-service";
import {TranslateService} from "ng2-translate/ng2-translate";


@Component({
    template: require('./user-login.html'),
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
    ]
})

export class LoginComponent {

    public formModel:FormGroup;
    public username:string;

    constructor(private userService:UserService,
                private titleService:TitleService,
                private router:Router, private flash: FlashBagService, private translate: TranslateService) {

        this.formModel = new FormGroup({
            'username': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required)
        });
        this.titleService.title = 'Login';
    }

    public onLogin() {
        console.log('Login');
        this.userService.login(
            new User(this.formModel.value.username, this.formModel.value.password),
            (user:User) => {
                this.router.navigateByUrl('/');
                this.translate.get('user.login.success')
                    .subscribe((v) => this.flash.addSuccess(v));
            },
            (err:Response) => {
                this.translate.get('user.login.fail')
                    .subscribe((v) => this.flash.addError(v + ': ' + err.json().message));
            }
        );
    }

    get value():string {
        return JSON.stringify(this.formModel.value, null, 2);
    }
}
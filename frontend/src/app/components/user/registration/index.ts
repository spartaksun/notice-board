import {Component} from "@angular/core";
import {TitleService} from "../../../services/title-service";
import {UserService} from "../../../services/user-service";
import {EqualGroupValidator} from "../../../validators/equal-group-validator";
import {EmailValidator}      from "../../../validators/email-validator";
import {
    FORM_DIRECTIVES,
    Validators,
    Control,
    ControlGroup,
} from '@angular/common';
import {Response} from "@angular/http";
import {Router} from "@angular/router";


@Component({
    template: require('./index.html'),
    directives: [
        FORM_DIRECTIVES
    ]
})

export class RegistrationComponent {

    public formModel:ControlGroup;
    public formErrorMessage:Array<any>;

    constructor(private userService:UserService,
                private titleService:TitleService,
                private router:Router) {
    }

    public ngOnInit() {
        this.formModel = new ControlGroup({
            'username': new Control('', Validators.compose([
                Validators.required,
                (control: Control) => {
                    let regexp = /^[a-zA-Z0-9\_\.\-]{3,20}$/;
                    return regexp.test(control.value) ? null : {
                        validateUsername: {
                            valid: false
                        }
                    };
                }
            ])),
            'email': new Control('', Validators.compose([
                Validators.required,
                EmailValidator.validator
            ])),
            'passwordsGroup': new ControlGroup({
                'password': new Control('', Validators.compose([
                    Validators.minLength(5),
                    Validators.required,
                ])),
                'pconfirm': new Control('')
            }, {}, EqualGroupValidator.validator)
        });
        this.titleService.title = 'Registration';
    }

    public onRegister() {
        let username = this.formModel.value.username;
        let password = this.formModel.value.passwordsGroup.password;
        let email = this.formModel.value.email;

        this.userService.register(username, email, password)
            .subscribe(
                user => {
                    this.userService.login(username, password)
                        .subscribe(
                            user => {
                                this.router.navigateByUrl('/');
                            });
                },
                (err:Response) => {
                    let msg = [];
                    var errors:Array<any> = err.json().errors.children;
                    for (var fieldName in errors) {
                        if (errors.hasOwnProperty(fieldName) && undefined !== errors[fieldName].errors) {
                            for (let i = 0; i < errors[fieldName].errors.length; i++) {
                                this.formModel.controls[fieldName].setErrors([{'required': true}]);
                                msg.push(fieldName.toLocaleUpperCase() + ': ' + errors[fieldName].errors[i])
                            }
                        }
                    }

                    this.formErrorMessage = msg;
                },
                () => console.log('Registration complete')
            );
    }

    get value():string {
        return JSON.stringify(this.formModel.value, null, 2);
    }
}
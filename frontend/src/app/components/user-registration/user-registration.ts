import {Component} from "@angular/core";
import {TitleService} from "../../services/title-service";
import {UserService, User} from "../../services/user-service";
import {EqualGroupValidator} from "../../validators/equal-group-validator";
import {EmailValidator}      from "../../validators/email-validator";
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import {TranslateService} from "ng2-translate/ng2-translate";
import {FlashBagService} from "../../services/flash-bag-service";
import {PhoneValidator} from "../../validators/phone-validator";
import {UsernameValidator} from "../../validators/username-validator";
import {City, CityService} from "../../services/city-service";
import {Observable} from "rxjs/Rx";


@Component({
    template: require('./user-registration.html'),
    directives: [
        REACTIVE_FORM_DIRECTIVES
    ]
})

export class RegistrationComponent {

    public formModel:FormGroup;
    public formErrorMessages:Array<any>;
    public cities:Observable<City[]>;

    constructor(private userService:UserService,
                private titleService:TitleService,
                private router:Router,
                private translate:TranslateService,
                private flash:FlashBagService,
                private cityService:CityService) {
    }

    public ngOnInit() {
        this.cities = this.cityService.getCities();
        this.formModel = new FormGroup({
            'username': new FormControl('', Validators.compose([
                Validators.required,
                UsernameValidator.validator
            ])),
            'email': new FormControl('', Validators.compose([
                Validators.required,
                EmailValidator.validator
            ])),
            'phone': new FormControl('', PhoneValidator.validator),
            'city': new FormControl('', Validators.required),
            'passwordsGroup': new FormGroup({
                'password': new FormControl('', Validators.compose([
                    Validators.minLength(6),
                    Validators.required,
                ])),
                'pconfirm': new FormControl('')
            }, {}, EqualGroupValidator.validator),

        });

        this.translate.get('user.register').subscribe(m => this.titleService.title = m);
    }

    public onRegister() {
        let v = this.formModel.value;
        let user = new User(v.username, v.passwordsGroup.password, v.email, v.phone, v.city);

        this.userService.register(user,
            (u:User) => {
                this.translate.get('user.register.success').subscribe(m => this.flash.addSuccess(m));
                this.userService.login(user,
                    (user) => this.router.navigateByUrl('/'),
                    (err:Response) => this.translate.get('user.login.fail').subscribe(m => this.flash.addError(m))
                )
            },
            (err:Response) => this.onRegistrationErrors((err))
        );
    }

    private onRegistrationErrors(err:Response) {

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

        this.translate.get('user.register.fail')
            .subscribe(m => {
                this.flash.addError(m);
                this.flash.addError(msg.join('\n'))
            });
    }

    get value():string {
        return JSON.stringify(this.formModel.value, null, 2);
    }
}
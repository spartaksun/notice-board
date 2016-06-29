import {Directive, provide} from '@angular/core';
import {NG_VALIDATORS, FormControl} from '@angular/forms';


@Directive({
    selector: '[validateUsername][ngControl]',
    providers: [
        provide(NG_VALIDATORS, {
            useValue: UsernameValidator.validator,
            multi: true
        })
    ]
})
export class UsernameValidator {
    static validator(c: FormControl) {
        let regExp = /^[a-zA-Z0-9\_\.\-]{3,20}$/;

        return regExp.test(c.value) ? null : {
            validateUsername: {
                valid: false
            }
        };
    }
}
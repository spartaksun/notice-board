import {Directive, provide} from '@angular/core';
import {NG_VALIDATORS, FormControl} from '@angular/forms';


@Directive({
    selector: '[validatePhone][ngControl]',
    providers: [
        provide(NG_VALIDATORS, {
            useValue: PhoneValidator.validator,
            multi: true
        })
    ]
})
export class PhoneValidator {
    static validator(c: FormControl) {
        let regExp = /^\+?(?:[0-9] ?){6,14}[0-9]$/;

        return regExp.test(c.value) ? null : {
            validatePhone: {
                valid: false
            }
        };
    }
}
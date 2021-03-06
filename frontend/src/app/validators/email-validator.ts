import {Directive, provide} from '@angular/core';
import {NG_VALIDATORS, FormControl} from '@angular/forms';


@Directive({
    selector: '[validateEmail][ngControl]',
    providers: [
        provide(NG_VALIDATORS, {
            useValue: EmailValidator.validator,
            multi: true
        })
    ]
})
export class EmailValidator {
    static validator(c: FormControl) {
        let regExp = /.+@.+\..+/i;

        return regExp.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }
}
import {Directive, provide} from '@angular/core';
import {NG_VALIDATORS, Control} from "@angular/common";

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
    static validator(c: Control) {
        let regExp = /.+@.+\..+/i;

        return regExp.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }
}
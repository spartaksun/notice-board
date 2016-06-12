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
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        return EMAIL_REGEXP.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }
}
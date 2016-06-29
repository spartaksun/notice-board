import {Directive, provide} from '@angular/core';
import {NG_VALIDATORS, FormGroup} from '@angular/forms';

@Directive({
    selector: '[validateEqual][ngControl]',
    providers: [
        provide(NG_VALIDATORS, {
            useValue: EqualGroupValidator.validator,
            multi: true
        })
    ]
})

export class EqualGroupValidator {

    static validator({value}: FormGroup):{[key:string]:any} {
        const [first, ...rest] = Object.keys(value || {});
        const valid = rest.every(v => value[v] === value[first]);

        return valid ? null : {equal: true};
    }
}
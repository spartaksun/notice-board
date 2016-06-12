import {Directive} from "@angular/core";

@Directive({
    selector: 'input[log-directive]',
    host: {
        '(input)': 'onInput($event)'
    }
})
export  class LogDirective {
    onInput(event) {
        console.log(event.target.value);
    }
}
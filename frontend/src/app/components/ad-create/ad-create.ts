import {Component} from '@angular/core';
import {AdFormComponent} from "../ad/ad-form.component";


@Component({
    template: require('./ad-create.html'),
    directives: [
        AdFormComponent
    ]

})
export class AdCreateComponent {

}
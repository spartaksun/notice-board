import {Component} from '@angular/core';
import {AdFormComponent} from "../ad/ad-form.component";
import {TitleService} from "../../services/title-service";


@Component({
    template: require('./ad-create.html'),
    directives: [
        AdFormComponent
    ]

})
export class AdCreateComponent {
    constructor(private titleService: TitleService) {
    }

    ngOnInit() {
        this.titleService.title = 'ad.create.title';
    }
}
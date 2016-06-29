import {Component} from '@angular/core';
import {AdFormComponent} from "../ad/ad-form.component";
import {ActivatedRoute} from "@angular/router";

@Component({
    template: require('./ad-edit.html'),
    directives: [
        AdFormComponent
    ]
})
export class AdEditComponent {
    public adId:number;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => this.adId = +params['adId']);
    }
}
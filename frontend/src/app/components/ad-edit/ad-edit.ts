import {Component} from '@angular/core';
import {RouteSegment, ROUTER_DIRECTIVES} from "@angular/router";
import {Ad} from "../ad/ad";
import {AdService} from "../../services/ad-service";
import {AdFormComponent} from "../ad/ad-form.component";

@Component({
    template: require('./ad-edit.html'),
    directives: [
        AdFormComponent
    ]
})
export class AdEditComponent {
    public adId:number;

    constructor(private adService:AdService) {
    }

    routerOnActivate(currentSegment:RouteSegment) {
        this.adId = parseInt(currentSegment.getParam('adId'));
    }
}
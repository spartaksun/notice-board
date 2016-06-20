import {Component} from '@angular/core';
import {RouteSegment, ROUTER_DIRECTIVES} from "@angular/router";
import {Ad} from "../ad/ad";
import {AdService} from "../../services/ad-service";

@Component({
    template: require('./ad-view.html'),

})
export class AdViewComponent {
    public ad:Ad;

    constructor(private adService:AdService) {
    }

    routerOnActivate(currentSegment:RouteSegment) {
        let adId = parseInt(currentSegment.getParam('adId'));
        this.adService.getAdById(adId)
            .subscribe((ad:Ad) => {
                this.ad = ad;
            });
    }
}
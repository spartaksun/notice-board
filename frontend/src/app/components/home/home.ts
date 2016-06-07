import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import AdPreviewComponent from "../ad/preview";
import {Observable} from "rxjs/Rx";
import {Ad, AdService} from "../../services/ad-service";

@Component({
    selector: 'notice-board-home-page',
    directives: [
        AdPreviewComponent,
        ROUTER_DIRECTIVES
    ],
    template: require('./home.html')
})
export default class HomeComponent {
    public ads: Observable<Ad[]>;

    constructor(private adService: AdService) {
        this.ads = this.adService.getAllAds();
    }
}

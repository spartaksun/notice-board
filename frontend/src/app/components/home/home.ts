import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import AdPreviewComponent from "../ad-preview/ad-preview";
import {Observable} from "rxjs/Rx";
import {AdService} from "../../services/ad-service";
import {TitleService} from "../../services/title-service";
import {Ad} from "../ad/ad";

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

    constructor(private adService: AdService, private titleService: TitleService) {
        this.ads = this.adService.getAllAds();
        this.titleService.title = 'Ads';
    }
}

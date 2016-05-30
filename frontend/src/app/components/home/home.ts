import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import AdComponent from "../ad/ad";
import {Observable} from "rxjs/Rx";
import {Ad, AdService} from "../../services/ad-service";

@Component({
    selector: 'notice-board-home-page',
    directives: [
        AdComponent,
        ROUTER_DIRECTIVES
    ],
    styles: [require('./home.css')],
    template: `
<h1>Home</h1>
<div class="row">
    <div *ngFor="let ad of ads | async">
        <notice-board-ad [ad]="ad"></notice-board-ad>
    </div>
</div>
`
})
export default class HomeComponent {
    public ads: Observable<Ad[]>;

    constructor(private adService: AdService) {
        this.ads = this.adService.getAds();
    }
}

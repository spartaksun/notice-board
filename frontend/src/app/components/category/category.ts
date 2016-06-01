/**
 * Created by spartaksun on 6/1/16.
 */
import {Component, Input} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Ad, AdService} from "../../services/ad-service";
import AdComponent from "../ad/ad";
import {RouteSegment} from "@angular/router";

@Component({
    selector: 'notice-board-category',
    directives: [
        AdComponent
    ],
    template: `<div class="row">
    <div *ngFor="let ad of ads | async">
        <notice-board-ad [ad]="ad"></notice-board-ad>
    </div>
</div>`
})
export default class CategoryComponent {
    public categoryId: number;
    public ads: Observable <Ad[]>;

    constructor(private adService: AdService) {
    }

    routerOnActivate(currentSegment:RouteSegment) {
        this.categoryId = parseInt(currentSegment.getParam('categoryId'));
        this.ads = this.adService.getAdsFromCategory(this.categoryId);
    }
}
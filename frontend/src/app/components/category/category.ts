/**
 * Created by spartaksun on 6/1/16.
 */
import {Component} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Ad, AdService} from "../../services/ad-service";
import AdComponent from "../ad/ad";
import {RouteSegment} from "@angular/router";
import {Category, CategoryService} from "../../services/category-service";

@Component({
    selector: 'notice-board-category',
    directives: [
        AdComponent
    ],
    template: require('./category.html')
})
export default class CategoryComponent {
    public category: Category;
    public ads: Observable <Ad[]>;

    constructor(private adService:AdService, private catService:CategoryService) {
    }

    routerOnActivate(currentSegment:RouteSegment) {
        let categoryId = parseInt(currentSegment.getParam('categoryId'));
        this.ads = this.adService.getAdsFromCategory(categoryId);
        this.catService.getCategory(categoryId)
            .subscribe(
                category => this.category = category,
                error => console.error(error)
            );
        
    }
}
/**
 * Created by spartaksun on 6/1/16.
 */
import {Component} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Ad, AdService} from "../../services/ad-service";
import AdComponent from "../ad/ad";
import {RouteSegment} from "@angular/router";
import {Category, CategoryService} from "../../services/category-service";
import {Title} from "@angular/platform-browser";


@Component({
    selector: 'notice-board-category',
    template: require('./category.html'),
    directives: [
        AdComponent,
    ]
})
export default class CategoryComponent {
    public category: Category;
    public ads: Observable <Ad[]>;

    private categoryId: number;

    constructor(private adService:AdService, 
                private catService:CategoryService, 
                private titleService: Title) {
    }

    routerOnActivate(currentSegment:RouteSegment) {
        this.categoryId = parseInt(currentSegment.getParam('categoryId'));
        this.ads = this.adService.getAdsFromCategory(this.categoryId);
        this.catService.getCategory(this.categoryId)
            .subscribe(
                (category) => {
                    this.category = category;
                    this.titleService.setTitle(category.name)
                },
                (error) => console.error(error)
            );

        console.log('routerOnActivate')
    }

}
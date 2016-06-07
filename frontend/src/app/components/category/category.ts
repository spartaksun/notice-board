/**
 * Created by spartaksun on 6/1/16.
 */
import {Component} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Ad, AdService} from "../../services/ad-service";
import AdPreviewComponent from "../ad/preview";
import {RouteSegment} from "@angular/router";
import {Category, CategoryService} from "../../services/category-service";
import {TitleService} from "../../services/title-service";


@Component({
    selector: 'notice-board-category',
    template: require('./category.html'),
    directives: [
        AdPreviewComponent,
    ]
})
export default class CategoryComponent {
    public category: Category;
    public ads: Observable <Ad[]>;

    constructor(private adService:AdService, 
                private catService:CategoryService, 
                private titleService: TitleService) {
    }

    routerOnActivate(currentSegment:RouteSegment) {
        var categoryId = parseInt(currentSegment.getParam('categoryId'));
        this.ads = this.adService.getAdsFromCategory(categoryId);
        this.catService.getCategory(categoryId)
            .subscribe(
                (category) => {
                    this.category = category;
                    this.titleService.title = category.name
                },
                (error) => console.error(error)
            );

        console.log('routerOnActivate')
    }

}
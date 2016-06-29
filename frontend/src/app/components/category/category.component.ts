/**
 * Created by spartaksun on 6/1/16.
 */
import {Component} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {AdService} from "../../services/ad-service";
import AdPreviewComponent from "../ad-preview/ad-preview";
import {CategoryService} from "../../services/category-service";
import {TitleService} from "../../services/title-service";
import {Ad} from "../ad/ad";
import {Category} from "./category";
import {ActivatedRoute} from "@angular/router";


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
                private titleService: TitleService, 
                private route: ActivatedRoute) {
    }
    
    ngOnInit() {
        this.route.params.subscribe(params => {
            let categoryId = +params['categoryId'];
            this.ads = this.adService.getAdsByCategory(categoryId);
            this.catService.getCategory(categoryId)
                .subscribe(
                    (category) => {
                        this.category = category;
                        this.titleService.title = category.name
                    },
                    (error) => console.error(error)
                );
        });
    }
}
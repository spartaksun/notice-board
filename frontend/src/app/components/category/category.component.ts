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
    category:Category;
    ads:Ad[];
    categoryId:number;
    loadingLocked:boolean;
    lastPage:boolean;
    currentPage:number;

    constructor(private adService:AdService,
                private catService:CategoryService,
                private titleService:TitleService,
                private route:ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.categoryId = +params['categoryId'];
            this.ads = [];

            this.currentPage = 0;
            this.loadingLocked = false;
            this.lastPage = false;

            this.loadAds();
            this.loadCategory();

        });
    }

    onScroll():void {
        let scrollTop = $(window).scrollTop();
        let windowHeight = $(window).height();
        let documentHeight = $(document).height();

        if (scrollTop + windowHeight >= documentHeight - 300) {
            this.loadAds();
        }
    }

    private loadAds() {
        if (this.loadingLocked || this.lastPage) {
            return;
        }

        this.loadingLocked = true;
        this.adService.getAdsByCategory(this.categoryId, this.currentPage)
            .subscribe(
                (ads:Ad[]) => {
                    if (ads.length === 0) {
                        this.lastPage = true;
                    } else {
                        this.currentPage++;
                        this.ads = this.ads.concat(ads);
                    }
                },
                () => {
                    this.lastPage = true;
                },
                () => {
                    setTimeout(() => {
                        this.loadingLocked = false
                    }, 100);
                }
            );
    }

    private loadCategory() {
        this.catService.getCategory(this.categoryId)
            .subscribe(
                (category) => {
                    this.category = category;
                    this.titleService.title = category.name
                },
                (error) => console.error(error)
            );
    }
}
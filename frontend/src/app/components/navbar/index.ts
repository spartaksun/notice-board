import {CategoryService, Category} from "../../services/category-service";
import {Observable} from "rxjs/Rx";
import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from '@angular/router';


@Component({
    selector: 'notice-board-navbar',
    template: require('./index.html'),
    directives: [
        ROUTER_DIRECTIVES
    ]
})
export class NavBarComponent {
    public categories:Observable <Category[]>;

    constructor(
                private categoryService:CategoryService) {

        this.categories = this.categoryService.getCategories();
    }

    get logged():boolean {
        return this.username != '';
    };

    get username():string {
        return '';
    }
}
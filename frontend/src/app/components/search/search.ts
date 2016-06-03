/**
 * Created by spartaksun on 6/1/16.
 */
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {CategoryService, Category} from "../../services/category-service";
import {Observable} from "rxjs/Rx";
import {AuthComponent} from "../auth/auth";

@Component({
    selector: 'notice-board-search',
    template: require('./search.html'),
    directives: [
        ROUTER_DIRECTIVES,
        AuthComponent
    ]
})
export default class SearchComponent {

    public categories: Observable <Category[]>;

    constructor(private categoryService: CategoryService) {
        this.categories = this.categoryService.getCategories();
    }
}
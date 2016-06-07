import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import HomeComponent from '../home/home';
import SearchComponent from "../search/search";
import CategoryComponent from "../category/category";
import {LoginComponent} from "../login/login";
import {LoginService} from "../../services/login-service";
import {CategoryService, Category} from "../../services/category-service";
import {Observable} from "rxjs/Rx";
import {Title} from "@angular/platform-browser";


@Component({
    selector: 'notice-board-application',
    template: require('./application.html'),
    directives: [
        ROUTER_DIRECTIVES,
        HomeComponent,
        SearchComponent,
    ]
})
@Routes([
    {path: '/', component: HomeComponent},
    {path: '/ads/:categoryId', component: CategoryComponent},
    {path: '/login', component: LoginComponent},
])
export default class ApplicationComponent {

    public categories:Observable <Category[]>;

    constructor(private loginService:LoginService,
                private categoryService:CategoryService, private titelService: Title) {

        this.categories = this.categoryService.getCategories();
        this.titelService.setTitle('test title')
    }

    get logged():boolean {
        return this.username != '';
    };

    get username():string {
        return this.loginService.user.username;
    }
}

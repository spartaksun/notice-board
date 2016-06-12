import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import HomeComponent from '../home/home';
import SearchComponent from "../search/search";
import CategoryComponent from "../category/category";
import {LoginComponent} from "../user/login";
import {TitleService} from "../../services/title-service";
import {NavBarComponent} from "../navbar";
import {LogDirective} from "./log";
import {RegistrationComponent} from "../user/registration/index";


@Component({
    selector: 'notice-board-application',
    template: require('./application.html'),
    directives: [
        ROUTER_DIRECTIVES,
        HomeComponent,
        SearchComponent,
        NavBarComponent,
        LogDirective
    ],
})
@Routes([
    {path: '/', component: HomeComponent},
    {path: '/ads/:categoryId', component: CategoryComponent},
    {path: '/login', component: LoginComponent},
    {path: '/registration', component: RegistrationComponent},
])
export default class ApplicationComponent {
    
    constructor(private titleService: TitleService) {
    }

    get pageTitle() {
        return this.titleService.title
    }
}

import {Component, EventEmitter, OnInit} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import HomeComponent from '../home/home';
import SearchComponent from "../search/search";
import CategoryComponent from "../category/category.component";
import {LoginComponent} from "../user-login/user-login";
import {TitleService} from "../../services/title-service";
import {NavBarComponent} from "../navbar";
import {LogDirective} from "./log";
import {RegistrationComponent} from "../user-registration/user-registration";
import {AdCreateComponent} from "../ad-create/ad-create";
import {TranslateService} from 'ng2-translate/ng2-translate';
import {UserService, User} from "../../services/user-service";
import {Response} from "@angular/http";


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
    {path: '/ad-create', component: AdCreateComponent},
    {path: '/login', component: LoginComponent},
    {path: '/registration', component: RegistrationComponent},
])
export default class ApplicationComponent implements OnInit {
    
    navBarVisibility: EventEmitter <any> = new EventEmitter();

    constructor(private titleService: TitleService, translate: TranslateService, private userService:UserService) {
        translate.setDefaultLang('en');
        translate.use('uk');
    }
    
    ngOnInit() {
        if (this.userService.authenticated()) {
            this.userService.profile((user:User) => {
                console.log('Logged in as ' + user.username)
            }, (err:Response) => {
                console.error(err);
            })
        }
    }

    get pageTitle() {
        return this.titleService.title
    }

    public showMenu() {
        this.navBarVisibility.emit({
            showed: true
        });
    }
}

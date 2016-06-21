import {Component, EventEmitter, OnInit} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
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
import UserAdsComponent from "../user-ads/user-ads";
import {AuthService} from "../../services/auth-service";
import {AdViewComponent} from "../ad-view/ad-view";


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
    {path: '/category/:categoryId', component: CategoryComponent},
    {path: '/ad-create', component: AdCreateComponent},
    {path: '/login', component: LoginComponent},
    {path: '/registration', component: RegistrationComponent},
    {path: '/user/:username/ads', component: UserAdsComponent},
    {path: '/ads/:adId', component: AdViewComponent},
])
export default class ApplicationComponent implements OnInit {
    
    navBarVisibility: EventEmitter <any> = new EventEmitter();

    constructor(private titleService: TitleService,
                private translate: TranslateService,
                private userService:UserService,
                private router:Router,
                private authService:AuthService) {

        translate.setDefaultLang('en');
        translate.use('uk');
        router.changes.subscribe(() => {
            window.scrollTo(0, 0);
        });
    }

    ngOnInit() {
        // try login
        if (this.userService.authenticated()) {
            this.userService.myProfile((user:User) => {
                this.authService.user = user;
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

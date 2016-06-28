import {Component, EventEmitter, OnInit} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import HomeComponent from '../home/home';
import SearchComponent from "../search/search";
import {TitleService} from "../../services/title-service";
import {NavBarComponent} from "../navbar";
import {LogDirective} from "./log";
import {TranslateService} from 'ng2-translate/ng2-translate';
import {UserService, User} from "../../services/user-service";
import {Response} from "@angular/http";
import {AuthService} from "../../services/auth-service";
import {FlashMessageComponent} from "../flash-message/flash-message";
import {APP_ROUTES} from "./routes";


@Component({
    selector: 'notice-board-application',
    template: require('./application.html'),
    directives: [
        ROUTER_DIRECTIVES,
        HomeComponent,
        SearchComponent,
        NavBarComponent,
        LogDirective,
        FlashMessageComponent,
    ],
})
@Routes(APP_ROUTES)
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

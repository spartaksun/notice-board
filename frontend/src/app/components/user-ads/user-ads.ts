import {Component} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {AdService} from "../../services/ad-service";
import AdPreviewComponent from "../ad-preview/ad-preview";
import {RouteSegment} from "@angular/router";
import {Ad} from "../ad/ad";
import {TitleService} from "../../services/title-service";
import {UserService, User} from "../../services/user-service";
import {Response} from "@angular/http";
import {AuthService} from "../../services/auth-service";


@Component({
    selector: 'notice-board-user-ads',
    template: require('./user-ads.html'),
    directives: [
        AdPreviewComponent,
    ]
})
export default class UserAdsComponent {
    public ads: Observable <Ad[]>;

    constructor(private adService:AdService, private titleService:TitleService,
                private authService:AuthService) {
    }

    get viewer():User {
        return this.authService.user;
    }

    routerOnActivate(currentSegment:RouteSegment) {
        let username = currentSegment.getParam('username');
        this.ads = this.adService.getAdsByUser(username);
        this.titleService.title = username +': ads';
    }
}
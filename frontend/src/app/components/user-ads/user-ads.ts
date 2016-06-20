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
                private userService: UserService, private authService:AuthService) {
    }

    get viewer():User {
        return this.authService.user;
    }

    routerOnActivate(currentSegment:RouteSegment) {
        let userId = parseInt(currentSegment.getParam('userId'));
        this.ads = this.adService.getAdsByUser(userId);

        this.userService.user(userId, (user:User) => {
            this.titleService.title = user.username;
        }, (error:Response)=> {});
    }
}
import {Component} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {AdService} from "../../services/ad-service";
import AdPreviewComponent from "../ad-preview/ad-preview";
import {Ad} from "../ad/ad";
import {TitleService} from "../../services/title-service";
import {User} from "../../services/user-service";
import {AuthService} from "../../services/auth-service";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'notice-board-user-ads',
    template: require('./user-ads.html'),
    directives: [
        AdPreviewComponent,
    ]
})
export default class UserAdsComponent {
    public ads: Observable <Ad[]>;

    constructor(private adService:AdService,
                private titleService:TitleService,
                private authService:AuthService,
                private route:ActivatedRoute) {
    }

    get viewer():User {
        return this.authService.user;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let username = params['username'];
            this.ads = this.adService.getAdsByUser(username);
            this.titleService.title = username +': ads';
        })
    }
}
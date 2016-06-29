import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Ad, AdImage} from "../ad/ad";
import {AdService} from "../../services/ad-service";
import CarouselComponent from "../carousel/carousel";

@Component({
    template: require('./ad-view.html'),
    directives: [
        CarouselComponent
    ]
})
export class AdViewComponent {
    public ad:Ad;
    public images:AdImage[];

    constructor(private adService:AdService, private route:ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let adId = +params['adId'];
            this.adService.getAdById(adId)
                .subscribe((ad:Ad) => {
                    this.ad = ad;
                    this.images = ad.images;
                });
        });
    }
}
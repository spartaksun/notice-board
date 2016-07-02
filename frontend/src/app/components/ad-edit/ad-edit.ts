import {Component} from '@angular/core';
import {AdFormComponent, IAdEvent} from "../ad/ad-form.component";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "ng2-translate/ng2-translate";
import {FlashBagService} from "../../services/flash-bag-service";

@Component({
    template: require('./ad-edit.html'),
    directives: [
        AdFormComponent
    ]
})
export class AdEditComponent {
    public adId:number;

    constructor(private route: ActivatedRoute,
                private router:Router,
                private translate:TranslateService,
                private flash:FlashBagService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => this.adId = +params['adId']);
    }

    onAdUpdated(event:IAdEvent) {
        this.router.navigateByUrl('/ads/' + event.ad.id);
        this.translate.get('ad.update.success')
            .subscribe((v) => this.flash.addSuccess(v));
    }
}
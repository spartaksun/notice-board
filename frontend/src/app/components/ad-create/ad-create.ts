import {Component} from '@angular/core';
import {AdFormComponent, IAdEvent} from "../ad/ad-form.component";
import {TitleService} from "../../services/title-service";
import {Router} from "@angular/router";
import {TranslateService} from "ng2-translate/ng2-translate";
import {FlashBagService} from "../../services/flash-bag-service";


@Component({
    template: require('./ad-create.html'),
    directives: [
        AdFormComponent
    ]
})
export class AdCreateComponent {
    constructor(private titleService: TitleService,
                private router:Router,
                private translate: TranslateService,
                private flash:FlashBagService) {
    }

    ngOnInit() {
        this.translate.get('ad.create.title')
            .subscribe(t => this.titleService.title = t)
    }

    onAdCreated(event:IAdEvent) {
        this.router.navigateByUrl('/ads/' + event.ad.id);
        this.translate.get('ad.create.success')
            .subscribe((v) => this.flash.addSuccess(v));
    }
}
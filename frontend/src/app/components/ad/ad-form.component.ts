import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Category} from "../category/category";
import {CategoryService} from "../../services/category-service";
import {Observable} from "rxjs/Rx";
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdService} from "../../services/ad-service";
import {TranslatePipe} from "ng2-translate/ng2-translate";
import {UPLOAD_DIRECTIVES} from "ng2-file-uploader/ng2-file-uploader";
import {AdImage, Ad} from "./ad";

export interface IAdEvent {
    ad:Ad
}

@Component({
    selector: 'ad-form',
    template: require('./ad-form.html'),
    directives: [REACTIVE_FORM_DIRECTIVES, UPLOAD_DIRECTIVES],
    pipes: [TranslatePipe]
})
export class AdFormComponent implements OnInit {

    @Output('submit-ad') adEmitter:EventEmitter<IAdEvent> = new EventEmitter<IAdEvent>();
    @Input() id:number;

    public adForm:FormGroup;
    public categories:Observable <Category[]>;
    public uploadedImages:AdImage[] = [];
    public uploadOptions:Object = {
        url: '/api/notices/images',
        withCredentials: true,
        authToken: localStorage.getItem('id_token'),
        fieldName: 'image'
    };

    public currencies:string[] = [
        'USD', 'UAH'
    ];

    constructor(private categoryService:CategoryService, private adService:AdService) {
    }

    ngOnInit() {
        this.categories = this.categoryService.getCategories();

        var title = new FormControl('', Validators.required),
            description = new FormControl('', Validators.required),
            delivery = new FormControl(false),
            secondHand = new FormControl(true),
            deliveryDescription = new FormControl(''),
            price = new FormControl(0, Validators.required),
            bargain = new FormControl(false),
            category = new FormControl('', Validators.required);

        this.adForm = new FormGroup({
            title: title,
            description: description,
            delivery: delivery,
            second_hand: secondHand,
            delivery_description: deliveryDescription,
            price: price,
            bargain: bargain,
            category: category
        });


        if (undefined !== this.id) {
            this.adService.getAdById(this.id)
                .subscribe((ad:Ad) => {
                    title.updateValue(ad.title);
                    description.updateValue(ad.description);
                    category.updateValue(ad.category.id);
                    price.updateValue(ad.price);
                    secondHand.updateValue(ad.second_hand);
                    deliveryDescription.updateValue(ad.delivery_description)

                    this.uploadedImages = ad.images;
                });
        }
        
    }

    onSubmit() {
        let ad = this.adForm.value;
        ad.images = this.uploadedImages;

        this.adService.create(ad)
            .subscribe((ad) => this.adEmitter.emit({ad: ad}));
    }

    handleUploadImage(data):void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadedImages.push(data);
        }
    }
}

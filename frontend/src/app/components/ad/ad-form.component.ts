import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Category} from "../category/category";
import {CategoryService} from "../../services/category-service";
import {Observable} from "rxjs/Rx";
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdService} from "../../services/ad-service";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {UPLOAD_DIRECTIVES} from "ng2-file-uploader/ng2-file-uploader";
import {AdImage, Ad} from "./ad";
import {FlashBagService} from "../../services/flash-bag-service";
import {Response} from "@angular/http";

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
    public uploadOptions:Object = {};

    public currencies:string[] = [
        'USD', 'UAH'
    ];

    constructor(private categoryService:CategoryService,
                private adService:AdService,
                private flash:FlashBagService, 
                private translate:TranslateService) {
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

        this.uploadOptions = {
            url: '/api/notices/images',
            withCredentials: true,
            authToken: localStorage.getItem('id_token'),
            fieldName: 'image',
            params: {
                'notice_id': this.id ? this.id : ''
            }
        };

        if (undefined !== this.id) {
            this.adService.getAdById(this.id)
                .subscribe((ad:Ad) => {
                    title.updateValue(ad.title);
                    description.updateValue(ad.description);
                    category.updateValue(ad.category.id);
                    price.updateValue(ad.price);
                    secondHand.updateValue(ad.second_hand);
                    deliveryDescription.updateValue(ad.delivery_description);

                    this.uploadedImages = ad.images;
                });
        }
    }

    onSubmit() {
        let ad = this.adForm.value;
        
        ad.images = this.uploadedImages;
        ad.id = this.id;


        let processor:Observable<Ad>;
        if(undefined !== ad.id) {
            processor = this.adService.update(ad)
        } else {
            processor = this.adService.create(ad);
        }
        processor.subscribe(
            (ad) => this.adEmitter.emit({ad: ad}),
            (err:Response) => this.onErrors(err)
        );
    }

    handleUploadImage(data):void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            if(undefined === data.error) {
                this.uploadedImages.unshift(data);
                this.translate.get('ad.image.upload.success')
                    .subscribe(v => this.flash.addSuccess(v))
            } else {
                this.translate.get('ad.image.upload.error')
                    .subscribe(v => this.flash.addError(v))
            }
        }
    }

    onDeleteImage(image:AdImage) {
        let id = image.id;

        this.adService.deleteImage(this.id, id).subscribe(
            () => {
                var index = this.uploadedImages.findIndex(element => {
                    return element.id === id;
                }, id);
                this.uploadedImages.splice(index, 1);
                this.translate.get('ad.image.delete.success')
                    .subscribe(v => this.flash.addSuccess(v))
            },
            () => {
                this.translate.get('ad.image.delete.error')
                    .subscribe(v => this.flash.addError(v))
            });
    }

    private onErrors(err:Response) {
        this.translate.get('ad.update.error')
            .subscribe(v => this.flash.addError(v));

        let errors:Array<any> = err.json().errors.children;
        for (let fieldName in errors) {
            if (errors.hasOwnProperty(fieldName) && undefined !== errors[fieldName].errors) {
                for (let i = 0; i < errors[fieldName].errors.length; i++) {
                    console.log('Error: '+ errors[fieldName].errors[i])
                    this.adForm.controls[fieldName].setErrors([{'required': true}]);
                }
            }
        }
    }
}

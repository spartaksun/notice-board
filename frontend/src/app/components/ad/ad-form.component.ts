import {Component, OnInit} from '@angular/core';
import {Category} from "../category/category";
import {CategoryService} from "../../services/category-service";
import {Observable} from "rxjs/Rx";
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdService} from "../../services/ad-service";
import {TranslatePipe} from "ng2-translate/ng2-translate";
import {UPLOAD_DIRECTIVES} from "ng2-file-uploader/ng2-file-uploader";


@Component({
    selector: 'ad-form',
    template: require('./ad-form.html'),
    directives: [REACTIVE_FORM_DIRECTIVES, UPLOAD_DIRECTIVES],
    pipes: [TranslatePipe]
})
export class AdFormComponent implements OnInit {

    public adForm:FormGroup;
    public categories:Observable <Category[]>;
    uploadedFiles: any[] = [];
    uploadOptions: Object = {
        url: '/api/notices/images',
        withCredentials: true,
        authToken: localStorage.getItem('id_token'),
        fieldName: 'image'
    };
    
    constructor(private categoryService:CategoryService, private adService:AdService) {
    }

    ngOnInit() {
        this.categories = this.categoryService.getCategories();
        this.adForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            delivery: new FormControl(),
            delivery_description: new FormControl('', Validators.required),
            price: new FormControl(),
            bargain: new FormControl(),
            category: new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        this.adService.postAd(this.adForm.value);
        console.log(this.adForm.value);
    }

    handleUpload(data): void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadedFiles.push(data);
        }
    }
}

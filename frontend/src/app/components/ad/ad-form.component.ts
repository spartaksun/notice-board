import {Component} from '@angular/core';
import {Ad} from "./ad";
import {Category} from "../category/category";

@Component({
    selector: 'ad-form',
    template: require('./ad-form.html')
})
export class AdFormComponent {

    model = new Ad(0, 'Dr IQ', 'desc', 'hjhj', new Category(1, 'gsdfg', 'dd'), true, true, 'sgsdf');
    submitted = false;

    onSubmit() {
        this.submitted = true;
    }

    active = true;

    newAd() {
        console.log('New ad create');
    }
}

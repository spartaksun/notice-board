import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import AdComponent from "../ad/ad";

@Component({
    selector: 'notice-board-home-page',
    directives: [
        AdComponent,
        ROUTER_DIRECTIVES
    ],
    styles: [require('./home.css')],
    template: require('./home.html')
})
export default class HomeComponent {
    constructor() {
        console.log('Run HomeComponent')
    }
}

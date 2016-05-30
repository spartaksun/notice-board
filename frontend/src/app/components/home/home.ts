import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import NoticeComponent from "../notice/notice";

@Component({
    selector: 'notice-board-home-page',
    directives: [
        NoticeComponent,
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

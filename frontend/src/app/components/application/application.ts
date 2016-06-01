import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import HomeComponent from '../home/home';
import SearchComponent from "../search/search";


@Component({
    selector: 'notice-board-application',
    template: require('./application.html'),
    styles: [require('./application.css')],
    directives: [
        ROUTER_DIRECTIVES,
        HomeComponent,
        SearchComponent
    ]
})
@Routes([
    {path: '/', component: HomeComponent},
    {path: '/ads/:categorySlug', component: HomeComponent},
])
export default class ApplicationComponent {
    constructor() {
        console.log('Run ApplicationComponent');
    }
}

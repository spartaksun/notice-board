/**
 * Created by spartaksun on 6/1/16.
 */
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";


@Component({
    selector: 'notice-board-search',
    template: require('./search.html'),
    directives: [
        ROUTER_DIRECTIVES
    ]
})
export default class SearchComponent {
    
}
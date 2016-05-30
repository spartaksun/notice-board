/**
 * Created by spartaksun on 5/30/16.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'notice-board-ad',
    template: require('./ad.html')
})
export default class AdComponent {
    constructor() {
        console.log('Run AdComponent');
    }
}
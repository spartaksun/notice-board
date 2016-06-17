
import {Component, Input} from '@angular/core';
import {Ad} from "../ad/ad";

@Component({
    selector: 'notice-board-ad',
    template: require('./ad-preview.html')
})
export default class AdPreviewComponent {
    @Input() ad:Ad;
}
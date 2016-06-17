
import {Component, Input} from '@angular/core';
import {Ad} from "../../services/ad-service";

@Component({
    selector: 'notice-board-ad',
    template: require('./ad-preview.html')
})
export default class AdPreviewComponent {
    @Input() ad:Ad;
}
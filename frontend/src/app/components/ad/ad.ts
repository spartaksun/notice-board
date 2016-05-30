/**
 * Created by spartaksun on 5/30/16.
 */
import {Component, Input} from '@angular/core';
import {Ad} from "../../services/ad-service";

@Component({
    selector: 'notice-board-ad',
    template: require('./ad.html')
})
export default class AdComponent {
    @Input()
    ad:Ad;
}
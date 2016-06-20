
import {Component, Input, OnInit} from '@angular/core';
import {Ad} from "../ad/ad";
import {User} from "../../services/user-service";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
    selector: 'notice-board-ad',
    template: require('./ad-preview.html'),
    directives: [
        ROUTER_DIRECTIVES
    ]
})
export default class AdPreviewComponent implements OnInit {
    @Input() ad:Ad;
    @Input() viewer:User;
    
    public showEditButton = false;
    
    ngOnInit() {
        if(this.viewer && this.viewer.username == this.ad.user.username) {
            this.showEditButton = true;
        }
    }
}
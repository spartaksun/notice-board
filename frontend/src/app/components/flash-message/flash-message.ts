import {Component} from "@angular/core";
import {FlashBagService, IFlashMessage} from "../../services/flash-bag-service";

@Component({
    "selector": "flash-message",
    "template": `<div class="client-message">        
        <p class="error-message" *ngFor="let m of errors" >{{ m }}</p>
        <p class="success-message" *ngFor="let m of success" >{{ m }}</p>
    </div>`
})
export class FlashMessageComponent {

    errors:string[] = [];
    success:string[] = [];

    private __index:number = 0;

    constructor(private flash: FlashBagService) {
        flash.messageEmitter.subscribe((msg:IFlashMessage) => {
            var index = this.index();
            console.log('Index=' + index);
            switch (msg.type) {
                case 'error':
                    this.errors.push(msg.message);
                    setTimeout(() => {
                        let i = this.errors.indexOf(msg.message);
                        this.errors.splice(i, 1);
                    }, msg.duration);
                    break;
                case 'success':
                    this.success.push(msg.message);
                    setTimeout(() => {
                        let i = this.success.indexOf(msg.message);
                        this.success.splice(i, 1);
                    }, msg.duration);
            }
        })
    }

    index():number {
        let i = this.__index;
        this.__index ++;

        return i;
    }

}



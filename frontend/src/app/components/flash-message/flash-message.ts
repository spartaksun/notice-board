import {Component, Input} from "@angular/core";
import {FlashBagService, IFlashMessage} from "../../services/flash-bag-service";

@Component({
    "selector": "flash-message",
    "template": `
    <div class="client-message">        
        <p  [ngClass]="{'error-message': (m.type == 'error'), 'success-message':  (m.type == 'success')}"
            *ngFor="let m of messages" 
            id="{{ m.id }}" 
            (click)="destroyElement($event)" > 
                        
            {{ m.message }} 
            
         </p>
    </div>`
})
export class FlashMessageComponent {

    messages:IFlashMessage[] = [];

    constructor(private flash:FlashBagService) {
        flash.messageEmitter.subscribe((msg:IFlashMessage) => {
            this.messages.push(msg);
            this.setAutoRemover(msg);
        })
    }

    destroyElement(event):void {
        event.preventDefault();
        this.removeById(event.target.id);
    }

    removeById(id:string):void {
        let index = this.messages.findIndex((msg:IFlashMessage) => {
            return msg.id == id;
        });
        $('#' + id).fadeToggle(300, () => this.messages.splice(index, 1));
    }

    setAutoRemover(msg:IFlashMessage) {
        setTimeout(() => this.removeById(msg.id), msg.duration);
    }
}



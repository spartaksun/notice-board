import {Injectable, EventEmitter} from "@angular/core";

export interface IFlashMessage {
    type:string,
    message:string,
    duration?:number
}

@Injectable()
export class FlashBagService {

    messageEmitter:EventEmitter<IFlashMessage> = new EventEmitter <IFlashMessage>();

    addSuccess(message:string, duration:number = 5000) {
        this.emit('success', message, duration);
    }

    addError(message:string, duration:number = 5000) {
        this.emit('error', message, duration);
    }

    private emit(type:string, message:string, duration:number) {
        this.messageEmitter.emit({
            type: type,
            message: message,
            duration: duration
        });
    }
}
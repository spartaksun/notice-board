import {Component, Input} from '@angular/core';
import {AdImage} from "../ad/ad";

interface ICarouselImage {
    file_key:string;
    format:string;
    id:number;
    active?:boolean;
}
@Component({
    selector: 'notice-carousel',
    template: require('./carousel.html')
})
export default class CarouselComponent {

    @Input() images:ICarouselImage[];

    activeIdx:number;
    pathToImages:string = '/images/';

    ngOnInit() {
        this.reset();
    }

    prev() {
        if(!this.empty()) {
            this.disableCurrent();
            if(this.activeIdx > 0) {
                this.activeIdx --;
                this.images[this.activeIdx].active = true;
            } else {
                this.end();
            }
        }
    }

    hasNext() {
        return this.activeIdx < this.count - 1;
    }

    next() {
       if(!this.empty()) {
           this.disableCurrent();
           if(this.hasNext()) {
               this.activeIdx ++;
               this.images[this.activeIdx].active = true;
           } else {
               this.reset();
           }
       }
    }

    end() {
        this.activeIdx = this.count -1;
        this.refresh();
    }

    disableCurrent() {
        this.images[this.activeIdx].active = false;
    }

    reset() {
        this.activeIdx = 0;
        if(!this.empty()) {
            this.refresh();
        }
    }

    refresh() {
        this.images[this.activeIdx].active = true;
    }

    empty() {
        return this.count == 0;
    }

    get count() {
        return this.images.length;
    }

    get currentNum() {
        return this.activeIdx + 1;
    }
}

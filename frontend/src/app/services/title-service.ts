import {Title} from "@angular/platform-browser";
import {Injectable} from "@angular/core";

@Injectable()
export class TitleService {

    private _title:string = '';

    constructor(private titleService:Title) {
    }

    set title(title: string) {
        this._title = title;
        this.titleService.setTitle(title + ' | Notice board ' )
    }

    get title() {
        return this._title;
    }
}
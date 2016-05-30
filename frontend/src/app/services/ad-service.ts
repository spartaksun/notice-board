import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from "@angular/http";

export class Ad {
    constructor(
        public id: number,
        public title: string,
        public description: string
    ){}    
}

@Injectable()
export class AdService {    
    constructor(private http: Http){}

    getAds(): Observable <Ad[]> {
        return this.http.get('/api/ads.json')
            .map(response => response.json());
    }
}
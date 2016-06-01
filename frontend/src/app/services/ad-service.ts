import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from "@angular/http";

export class Ad {
    constructor(public id:number,
                public title:string,
                public description:string) {
    }
}

@Injectable()
export class AdService {
    constructor(private http:Http) {
    }

    getAllAds():Observable <Ad[]> {
        return this.getAds('/api/ads');
    }

    getAdsFromCategory(categoryId: number):Observable <Ad[]> {
        return this.getAds('/api/ads?category=' + categoryId);
    }

    private getAds(url: string):Observable <Ad[]> {
        return this.http.get(url)
            .map(response => response.json());
    }
}
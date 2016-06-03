import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { AuthHttp } from "angular2-jwt/angular2-jwt";

export class Ad {
    constructor(public id:number,
                public title:string,
                public description:string) {
    }
}

@Injectable()
export class AdService {
    constructor(private http: AuthHttp) {
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
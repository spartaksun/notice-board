import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Headers, Response} from "@angular/http";
import {Ad} from "../components/ad/ad";
import {AuthHttp} from 'angular2-jwt/angular2-jwt';

@Injectable()
export class AdService {

    constructor(private http:Http, private authHttp: AuthHttp) {
    }

    getAllAds():Observable <Ad[]> {
        return this.getAds('/api/ads');
    }

    getAdsByCategory(categoryId:number):Observable <Ad[]> {
        return this.getAds('/api/ads?category=' + categoryId);
    }

    getAdsByUser(userId:number):Observable <Ad[]> {
        return this.getAds('/api/ads?user=' + userId);
    }

    private getAds(url:string):Observable <Ad[]> {
        return this.http.get(url)
            .map(response => response.json());
    }

    public postAd(ad:Ad) {
        this.create(ad).subscribe(
            (ad) => {
                console.log(ad)
            },
            (error:Response) => {
                console.log(error)
            }
        );
    }

    private create(ad:Ad):Observable <Ad> {
        console.log(ad);
        return this.authHttp.post('/api/ads', JSON.stringify({
            'ad': {
                title: ad.title,
                description: ad.description,
                price: ad.price,
                currency: 'USD',
                category: ad.category.id,
                bargain: ad.bargain,
                delivery: ad.delivery,
                deliveryDescription: ad.delivery_description
            }
        }), {headers: new Headers({'Content-Type': 'application/json'})})
            .map(data => data.json())
            .catch(this._serverError)
    }

    private _serverError(err: any) {
        console.log('sever error:', err);  // debug
        if(err instanceof Response) {
            return Observable.throw(err.json().error || 'backend server error');
            // if you're using lite-server, use the following line
            // instead of the line above:
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }
}
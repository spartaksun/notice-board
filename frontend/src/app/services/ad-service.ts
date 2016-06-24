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
        return this.getAds('/api/notices');
    }

    getAdsByCategory(categoryId:number):Observable <Ad[]> {
        return this.getAds('/api/notices?category=' + categoryId);
    }

    getAdsByUser(username:string):Observable <Ad[]> {
        return this.getAds('/api/notices?username=' + username);
    }
    
    getAdById(adId:number):Observable <Ad> {
        return this.http.get('/api/notices/' + adId)
            .map(response => response.json());
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
        return this.authHttp.post('/api/notices', JSON.stringify({
            'notice': {
                title: ad.title,
                description: ad.description,
                price: ad.price,
                currency: 'USD',
                category: ad.category.id,
                bargain: ad.bargain,
                delivery: ad.delivery,
                deliveryDescription: ad.delivery_description,
                images: ad.images.map((img):number => img.id)
            }
        }), {headers: new Headers({'Content-Type': 'application/json'})})
            .map(data => data.json())
            .catch(this._serverError)
    }

    private _serverError(err: any) {
        console.log('sever error:', err);
        if(err instanceof Response) {
            return Observable.throw(err.json().error || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }
}
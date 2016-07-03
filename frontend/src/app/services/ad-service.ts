import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Headers} from "@angular/http";
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


    /**
     * Create an ad
     * @param ad
     * @returns {Observable<Ad>}
     */
    create(ad:Ad):Observable <Ad> {

        return this.authHttp.post(
            '/api/notices', JSON.stringify(this.prepareAdObject(ad)), {headers: new Headers({'Content-Type': 'application/json'})})
            .map(data => data.json())
    }
    
    deleteImage(imageIid:number) {
        return this.authHttp.delete('/api/images/' + imageIid)
            .map(response => response.json());
    } 

    /**
     * Update an ad
     * @param ad
     * @returns {Observable<Ad>}
     */
    public update(ad:Ad):Observable <Ad> {

        return this.authHttp.patch(
            '/api/notices/' + ad.id, JSON.stringify(this.prepareAdObject(ad)), {headers: new Headers({'Content-Type': 'application/json'})}
        ).map(data => data.json())
    }

    private prepareAdObject(ad) {
        return {
            'notice': {
                title: ad.title,
                description: ad.description,
                price: ad.price,
                currency: 'USD',
                category: ad.category,
                bargain: ad.bargain,
                delivery: ad.delivery,
                secondHand: ad.second_hand,
                deliveryDescription: ad.delivery_description,
                images: ad.images.map((img):number => img.id)
            }
        };
    }
}
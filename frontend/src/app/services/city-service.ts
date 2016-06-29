import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from "@angular/http";

export class City {
    public id:number;
    public name:string;
}

@Injectable()
export class CityService {
    constructor(private http:Http) {
    }

    getCities():Observable <City[]> {
        return this.http.get('/api/cities')
            .map(response => response.json());
    }
}
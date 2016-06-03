/**
 * Created by spartaksun on 6/1/16.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { AuthHttp } from "angular2-jwt/angular2-jwt";

export class Category {
    constructor(public id:number,
                public name:string,
                public slug:string) {
    }
}

@Injectable()
export class CategoryService {
    constructor(private http: AuthHttp ) {
    }

    getCategories():Observable <Category[]> {
        return this.http.get('/api/categories')
            .map(response => response.json());
    }
    
    getCategory(categoryId): Observable <Category> {
        return this.http.get(`/api/categories/${categoryId}`)
            .map(response => response.json());
    }
}
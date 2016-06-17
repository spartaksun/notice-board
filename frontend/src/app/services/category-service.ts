/**
 * Created by spartaksun on 6/1/16.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from "@angular/http";
import {Category} from "../components/category/category";

@Injectable()
export class CategoryService {
    constructor(private http: Http ) {
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
import {CategoryService, Category} from "../../services/category-service";
import {Observable} from "rxjs/Rx";
import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AuthService} from "../../services/auth-service";
import {User} from "../../services/user-service";


@Component({
    selector: 'notice-board-navbar',
    template: require('./index.html'),
    directives: [
        ROUTER_DIRECTIVES
    ]
})
export class NavBarComponent {
    public categories:Observable <Category[]>;

    constructor(private categoryService:CategoryService, private auth: AuthService) {
        this.categories = this.categoryService.getCategories();
    }

    get logged():boolean {
        return this.user.hasOwnProperty('username') && this.user.username !== '';
    };

    get user():User {
        return this.auth.user;
    }
}
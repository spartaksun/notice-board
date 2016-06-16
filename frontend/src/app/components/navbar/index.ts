import {CategoryService, Category} from "../../services/category-service";
import {Observable} from "rxjs/Rx";
import {Component, Input, EventEmitter} from "@angular/core";
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
    @Input() toggleNavbar: EventEmitter <any>;
    
    public categories:Observable <Category[]>;
    public active:boolean = false;

    constructor(private categoryService:CategoryService, private auth:AuthService) {
        this.categories = this.categoryService.getCategories();
    }

    ngOnInit(){
        this.toggleNavbar.subscribe(() => {
            this.active = true;
        })
    }

    public logout() {
        this.auth.logout();
    }

    get logged():boolean {
        return this.user.hasOwnProperty('username') && this.user.username !== '';
    };

    get user():User {
        return this.auth.user;
    }

}
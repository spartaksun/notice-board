import {CategoryService} from "../../services/category-service";
import {Observable} from "rxjs/Rx";
import {Component, Input, EventEmitter} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AuthService} from "../../services/auth-service";
import {User} from "../../services/user-service";
import {Category} from "../category/category";
import {TranslatePipe} from "ng2-translate/ng2-translate";


@Component({
    selector: 'notice-board-navbar',
    template: require('./index.html'),
    directives: [
        ROUTER_DIRECTIVES
    ],
    pipes: [TranslatePipe]
})
export class NavBarComponent {
    @Input() toggleNavbar: EventEmitter <any>;
    
    public categories:Observable <Category[]>;
    public active:boolean = false;

    constructor(private categoryService:CategoryService, private auth:AuthService,private route: Router) {
        this.categories = this.categoryService.getCategories();
    }

    ngOnInit(){
        this.toggleNavbar.subscribe(() => {
            this.active = true;
        })
    }

    public logout() {
        this.auth.logout();
        this.route.navigateByUrl('/login')
    }

    get logged():boolean {
        return this.user.hasOwnProperty('username') && this.user.username !== '';
    };

    get user():User {
        return this.auth.user;
    }

}
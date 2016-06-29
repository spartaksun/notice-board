import {CanActivate} from '@angular/router';
import {UserService} from "./user-service";
import {Injectable} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {FlashBagService} from "./flash-bag-service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService:UserService,
                private translate:TranslateService,
                private flash:FlashBagService) {
    }

    canActivate() {
        if (this.userService.authenticated()) {
            return true
        }

        this.translate.get('user.auth.error')
            .subscribe((v) => this.flash.addError(v));
    }
}
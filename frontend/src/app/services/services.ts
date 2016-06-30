/**
 * Created by spartaksun on 5/30/16.
 */
import {AdService} from "./ad-service";
import {CategoryService} from "./category-service";
import {UserService} from "./user-service";
import {TitleService} from "./title-service";
import {AuthService} from "./auth-service";
import {FlashBagService} from "./flash-bag-service";
import {CityService} from "./city-service";
import {AuthGuard} from "./auth.guard";

export const APP_SERVICES = [
    AdService,
    CategoryService,
    CityService,
    UserService,
    TitleService,
    AuthService,
    FlashBagService,
    AuthGuard
];


/**
 * Created by spartaksun on 5/30/16.
 */
import {WebSocketService} from './websocket-service';
import {AdService} from "./ad-service";
import {CategoryService} from "./category-service";
import {LoginService} from "./login-service";
import {UserService} from "./user-service";
import {Title} from "@angular/platform-browser";

export const APP_SERVICES = [
    WebSocketService,
    AdService,
    CategoryService,
    LoginService,
    UserService
];


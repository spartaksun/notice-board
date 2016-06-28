import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AdViewComponent} from "../ad-view/ad-view";
import {AdEditComponent} from "../ad-edit/ad-edit";
import UserAdsComponent from "../user-ads/user-ads";
import {RegistrationComponent} from "../user-registration/user-registration";
import {LoginComponent} from "../user-login/user-login";
import {AdCreateComponent} from "../ad-create/ad-create";
import CategoryComponent from "../category/category.component";
import HomeComponent from "../home/home";

export const APP_ROUTES = [
    {path: '/', component: HomeComponent},
    {path: '/category/:categoryId', component: CategoryComponent},
    {path: '/ad-create', component: AdCreateComponent},
    {path: '/login', component: LoginComponent},
    {path: '/registration', component: RegistrationComponent},
    {path: '/user/:username/ads', component: UserAdsComponent},
    {path: '/ads/:adId/edit', component: AdEditComponent},
    {path: '/ads/:adId', component: AdViewComponent},
];


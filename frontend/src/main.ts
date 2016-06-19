import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';

if (webpack.ENV === 'production') {
    enableProdMode();
}

import ApplicationComponent from './app/components/application/application';
import {APP_SERVICES} from './app/services/services';
import {AUTH_PROVIDERS} from 'angular2-jwt/angular2-jwt';
import {Title} from "@angular/platform-browser";
import {disableDeprecatedForms, provideForms} from '@angular/forms';

bootstrap(ApplicationComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    Title,

    APP_SERVICES,
    AUTH_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]).catch(console.error.bind(console));

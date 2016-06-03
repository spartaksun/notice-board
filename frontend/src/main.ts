import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {FORM_PROVIDERS} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';

if (webpack.ENV === 'production') {
    enableProdMode();
}

import ApplicationComponent from './app/components/application/application';
import {APP_SERVICES} from './app/services/services';
import {AUTH_PROVIDERS, AuthConfig} from 'angular2-jwt/angular2-jwt';


var authConfig = new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    tokenName: 'id_token',
    tokenGetter: (() => localStorage.getItem(this.tokenName)),
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: true,
    noTokenScheme: true
});

bootstrap(ApplicationComponent, [
    FORM_PROVIDERS,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,

    APP_SERVICES,
    AUTH_PROVIDERS
]).catch(console.error.bind(console));

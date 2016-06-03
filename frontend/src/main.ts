import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode, provide} from '@angular/core';
import {FORM_PROVIDERS} from '@angular/common';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';

if (webpack.ENV === 'production') {
    enableProdMode();
}

import ApplicationComponent from './app/components/application/application';
import {APP_SERVICES} from './app/services/services';
import {AUTH_PROVIDERS, AuthHttp, AuthConfig} from 'angular2-jwt';

bootstrap(ApplicationComponent, [
    FORM_PROVIDERS,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,

    APP_SERVICES,
    // AUTH_PROVIDERS,
    provide('Auth2', {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                headerName: 'Authorization',
                headerPrefix: 'Bearer',
                tokenName: 'id_token',
                tokenGetter: (() => localStorage.getItem(this.tokenName)),
                globalHeaders: [{'Content-Type': 'application/json'}],
                noJwtError: true,
                noTokenScheme: true
            }), http);
        },
        deps: [Http]
    }),
]).catch(console.error.bind(console));

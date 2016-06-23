import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode, provide, PLATFORM_PIPES} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';

if (webpack.ENV === 'production') {
    enableProdMode();
}

import ApplicationComponent from './app/components/application/application';
import {APP_SERVICES} from './app/services/services';
import {AUTH_PROVIDERS} from 'angular2-jwt/angular2-jwt';
import {Title} from "@angular/platform-browser";
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {TranslateLoader, TranslateStaticLoader, TranslateService, TranslatePipe} from "ng2-translate/ng2-translate";

bootstrap(ApplicationComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    Title,

    APP_SERVICES,
    AUTH_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    provide(PLATFORM_PIPES, {useValue: [TranslatePipe], multi: true}),
    provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    }),
    // use TranslateService here, and not TRANSLATE_PROVIDERS (which will define a default TranslateStaticLoader)
    TranslateService
]).catch(console.error.bind(console));

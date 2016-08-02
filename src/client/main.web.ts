// angular
import {provide, enableProdMode, PLATFORM_DIRECTIVES} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HTTP_PROVIDERS} from "@angular/http";

// config
import {Config} from './app/frameworks/core/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;
Config.DEBUG.LEVEL_4 = true;

// app
import {WindowService, ConsoleService, CORE_PROVIDERS} from './app/frameworks/core/index';
import {ANALYTICS_PROVIDERS} from './app/frameworks/analytics/index';
import {MultilingualService} from './app/frameworks/i18n/index';
import {APP_PROVIDERS, AppConfigService} from './app/frameworks/app/index';
import {APP_ROUTER_PROVIDERS} from './app/components/app/app.routes';
import {AppComponent} from './app/components/app/app.component';
import {PAGE} from "./app/frameworks/core/index";
import {MD_SIDENAV_DIRECTIVES} from "@angular2-material/sidenav/sidenav";
import {MdIconRegistry, MdIcon} from '@angular2-material/icon';
import {MD_LIST_DIRECTIVES} from "@angular2-material/list/list";
import {MD_CARD_DIRECTIVES} from "@angular2-material/card/card";
import {MD_INPUT_DIRECTIVES} from "@angular2-material/input/input";
import {MD_BUTTON_DIRECTIVES} from "@angular2-material/button/button";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MdToolbar} from "@angular2-material/toolbar/toolbar";
import {MD_MENU_DIRECTIVES} from "@angular2-material/menu/menu";
import {provideStore} from '@ngrx/store';
import {provideDB} from '@ngrx/db';
import {runEffects} from '@ngrx/effects';

import schema from './app/frameworks/app/schemas/db-schema';
import reducer from './app/frameworks/app/reducers/index';
import effects from './app/frameworks/app/effects/index';
import actions from './app/frameworks/app/actions/index';
import guards from './app/frameworks/app/guards/index';
import {WtmClientsService} from "./app/frameworks/app/services/wtm-clients";

// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;

// depending on environments, you could push in different providers as needed
const ENV_PROVIDERS:Array<any> = [];

// example of how to use build variables to determine environment
if ('<%= ENV %>' === 'prod' || '<%= TARGET_DESKTOP_BUILD %>' === 'true') {
    enableProdMode();
}

let BOOTSTRAP_PROVIDERS:any[] = [
    disableDeprecatedForms(),
    provideForms(),
    ENV_PROVIDERS,
    HTTP_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '<%= APP_BASE %>'}),
    provide(WindowService, {useValue: window}),
    provide(ConsoleService, {useValue: console}),
    CORE_PROVIDERS,
    ANALYTICS_PROVIDERS,
    APP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    WtmClientsService,
    {provide: PLATFORM_DIRECTIVES, useValue: MdIcon, multi: true},
    {provide: PLATFORM_DIRECTIVES, useValue: MD_SIDENAV_DIRECTIVES, multi: true},
    {provide: PLATFORM_DIRECTIVES, useValue: MD_LIST_DIRECTIVES, multi: true},
    {provide: PLATFORM_DIRECTIVES, useValue: MD_CARD_DIRECTIVES, multi: true},
    {provide: PLATFORM_DIRECTIVES, useValue: MD_INPUT_DIRECTIVES, multi: true},
    {provide: PLATFORM_DIRECTIVES, useValue: MD_BUTTON_DIRECTIVES, multi: true},
    {provide: PLATFORM_DIRECTIVES, useValue: MdToolbar, multi: true},
    {provide: PLATFORM_DIRECTIVES, useValue: MD_MENU_DIRECTIVES, multi: true},
    {provide: PLATFORM_DIRECTIVES, useValue: [ROUTER_DIRECTIVES], multi: true},
    MdIconRegistry,
    APP_ROUTER_PROVIDERS,
    {provide: PAGE, useValue: {}},
    provideStore(reducer),

    /**
     * runEffects configures all providers for @ngrx/effects. Observables decorated
     * as an @Effect() within the supplied services will ultimately be merged,
     * with output of relevant (registered as effects) actions being
     * dispatched into your application store. Any side-effects in
     * your application should be registered as effects.
     *
     * Source: https://github.com/ngrx/effects/blob/master/lib/run-effects.ts#L8-L20
     */
    runEffects(effects),

    /**
     * provideRouter sets up all of the providers for @angular/router. It accepts
     * an array of routes and a location strategy. By default, it will use
     * `PathLocationStrategy`.
     */
    /**
     * Make router directives available to all components
     */
    /**
     * Override the default location strategy with `HashLocationStrategy`
     */
    /**
     * provideDB sets up @ngrx/db with the provided schema and makes the Database
     * service everywhere.
     */
    provideDB(schema),

    /**
     * Finall we provide additional services and action creators so they can
     * be used by all of our components, effects, and guards.
     */
    actions,
    guards,

];

if ('<%= TARGET_DESKTOP %>' === 'true') {
    Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
    // desktop (electron) must use hash
    BOOTSTRAP_PROVIDERS.push(provide(LocationStrategy, {useClass: HashLocationStrategy}));
}

bootstrap(AppComponent, BOOTSTRAP_PROVIDERS)
    .catch((err:any) => console.error(err));

// In order to start the Service Worker located at "./worker.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
//
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./worker.js').then((registration: any) =>
//       console.log('ServiceWorker registration successful with scope: ', registration.scope))
//     .catch((err: any) =>
//       console.log('ServiceWorker registration failed: ', err));
// }

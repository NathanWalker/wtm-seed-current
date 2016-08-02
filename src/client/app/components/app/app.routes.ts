import {provideRouter, RouterConfig} from '@angular/router';

import {AboutRoutes} from '../about/about.routes';
import {HomeRoutes} from '../home/home.routes';
import {LoginRoutes} from "../login/login.routes";
import {SearchRoutes} from "../search-page/search.routes";
import {ClientRoutes} from "../clientSearch/clients.route";

export const routes:RouterConfig = [
    ...LoginRoutes,
    ...HomeRoutes,
    ...AboutRoutes,
    ...SearchRoutes,
    ...ClientRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];

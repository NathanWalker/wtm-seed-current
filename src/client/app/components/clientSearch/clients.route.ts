/**
 * Created by benevideschissanga on 31/07/16.
 */
import { RouterConfig } from '@angular/router';
import {ClientViewPage} from "../../frameworks/app/pages/client-view";
import {ClientExistsGuard} from "../../frameworks/app/guards/client-exists";
export const ClientRoutes: RouterConfig = [
    {
        path: 'client/:id',
        canActivate: [ ClientExistsGuard ],
        component: ClientViewPage
    }
];

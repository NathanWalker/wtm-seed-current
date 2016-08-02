/**
 * Created by benevideschissanga on 27/07/16.
 */
import {LoginComponent} from "./login.component";
export const LoginRoutes = [
    {
        path: '',
        redirectTo: '/login',
        terminal: true
    },
    {
        path: 'login',
        component: LoginComponent
    },
];

/**
 * Created by benevideschissanga on 19/07/16.
 */
import {BaseComponent} from '../../frameworks/core/index';
import {Inject, ViewEncapsulation, OnInit} from "@angular/core";
import {PAGE} from "../../frameworks/core/tokens/opakeToken";
import {Config} from "../../frameworks/core/services/config.service";
import {Router} from "@angular/router";
@BaseComponent({
    moduleId: module.id,
    selector: 'sd-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
    //noinspection TypeScriptUnresolvedVariable
    constructor(@Inject(PAGE) private page:any, private router:Router) {
        if (Config.IS_MOBILE_NATIVE()) {
            this.page.actionBarHidden = true;
            this.page.backgroundSpanUnderStatusBar = true;
            this.page.backgroundImage = this.page.ios ? "res://bg_login.jpg" : "res://bg_login";
        }
    }

    ngOnInit() {
    }

    submit() {
        this.router.navigate(["/home"]);
    }
}

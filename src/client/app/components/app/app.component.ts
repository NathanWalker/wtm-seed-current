// angular
import {ChangeDetectionStrategy, ViewChild, AfterViewInit} from '@angular/core';

// app
import {NameListService} from '../../frameworks/app/index';
import {AnalyticsService} from '../../frameworks/analytics/index';
import {RouteComponent, PlatformDirective} from '../../frameworks/core/index';
import {LangSwitcherComponent} from '../../frameworks/i18n/index';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {Config} from "../../frameworks/core/services/config.service";
import {SetClassDirective} from "../../frameworks/core/directives/setClass.directive";
import {RouterLinkActive} from "@angular/router";


@RouteComponent({
    moduleId: module.id,
    selector: 'sd-app',
    viewProviders: [NameListService],
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    directives: [LangSwitcherComponent, NavbarComponent, ToolbarComponent, PlatformDirective, SetClassDirective, RouterLinkActive],
    changeDetection: ChangeDetectionStrategy.Default, // Everything else uses OnPush
    providers: []
})
export class AppComponent implements AfterViewInit
{
    @ViewChild('sidenav') sideNav:any;
    private toggleNav:any;
    constructor(public analytics:AnalyticsService) {

    }
    ngAfterViewInit():any {
        if (Config.IS_WEB) {

        }
        this.toggleNav= ()=>{
            this.sideNav.toggle();
        }
    }


}

// app
import {RouteComponent} from '../../frameworks/core/index';
import {EventEmitter, Output, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";

@RouteComponent({
    moduleId: module.id,
    selector: 'sd-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class NavbarComponent implements OnInit {
    @Output() openNav = new EventEmitter();
    private navigationUrl:any;
    private toggled:boolean = false;
    selected = '';
    items = [
        {text: 'Refresh'},
        {text: 'Settings'},
        {text: 'Help'},
        {text: 'Sign Out', disabled: true}
    ];

    select(text: string) { this.selected = text; }
    constructor(private router:Router) {

    }

    ngOnInit() {
        this.router
            .events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    this.navigationUrl = event.url;
                }
            });
    }

    openSideNav(e:any) {
        this.openNav.emit(e);
        this.toggled = !this.toggled;
    }
}

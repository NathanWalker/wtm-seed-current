/**
 * Created by benevideschissanga on 22/07/16.
 */

// angular
import {Directive, ElementRef, Renderer, AfterViewInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

@Directive({
    selector: '[setClass]'
})
export class SetClassDirective implements AfterViewInit {
    private componentClass:string = 'login';

    constructor(private el:ElementRef, private renderer:Renderer, private router:Router) {
    }

    ngAfterViewInit() {
        this.router
            .events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    if (event.url === '/' || event.url === '/login') {
                        this.renderer.setElementClass(this.el.nativeElement, this.componentClass, true);
                        this.renderer.setElementClass(this.el.nativeElement, 'not-login', false);
                    } else {
                        this.renderer.setElementClass(this.el.nativeElement, this.componentClass, false);
                        this.renderer.setElementClass(this.el.nativeElement, 'not-login', true);
                    }
                }
            });
    }
}

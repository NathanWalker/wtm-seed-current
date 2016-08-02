/**
 * Created by benevideschissanga on 27/07/16.
 */
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {Output, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {BaseComponent} from "../../frameworks/core/index";

export type QueryInput = string;
export type SearchOutput = string;
@BaseComponent({
    moduleId: module.id,
    selector: 'sd-clientSearch',
    templateUrl: 'client-search.component.html',
    styleUrls: ['client-search.component.css']
})
export class ClientSearchComponent {
    keyup$ = new Subject<KeyboardEvent>();

    @Input() query: QueryInput = '';
    @Output() search: Observable<SearchOutput> = this.keyup$
        .debounceTime(300)
        .map(event => (event.target as HTMLInputElement).value)
        .distinctUntilChanged();
}

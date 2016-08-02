/**
 * Created by benevideschissanga on 24/07/16.
 */
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import { ClientActions } from '../../frameworks/app/actions/client';
import { ClientSearchComponent, QueryInput, SearchOutput } from '../clientSearch/client-search.component';
import { ClientPreviewListComponent, ClientsInput } from '../clientSearch/client-preview-list';
import {FormComponent} from "../../frameworks/core/index";
import {AppState, getSearchQuery, getSearchResults} from "../../frameworks/app/reducers/index";
@FormComponent({
    moduleId: module.id,
    selector: 'sd-search',
    templateUrl: 'search-page.component.html',
    styleUrls: ['search-page.component.css'],
    directives: [ClientSearchComponent, ClientPreviewListComponent],
    providers: []
})

export class SearchPageComponent {
    searchQuery$: Observable<QueryInput>;
    clients$: Observable<ClientsInput>;

    constructor(private store: Store<AppState>, private clientActions: ClientActions) {
        /**
         * Selectors can be applied with the `let` operator, which passes the source
         * observable to the provided function. This allows us an expressive,
         * composable technique for creating view projections.
         *
         * More on `let`: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35#let
         * More on selectors: https://gist.github.com/btroncone/a6e4347326749f938510#extracting-selectors-for-reuse
         */
        this.searchQuery$ = store.let(getSearchQuery()).take(1);
        this.clients$ = store.let(getSearchResults());
    }

    search(query: SearchOutput) {
        /**
         * All state updates are handled through dispatched actions in 'smart'
         * components. This provides a clear, reproducible history of state
         * updates and user interaction through the life of our application.
         */
        this.store.dispatch(this.clientActions.search(query));
    }
}

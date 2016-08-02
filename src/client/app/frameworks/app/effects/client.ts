import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Database } from '@ngrx/db';

import { WtmClientsService } from '../services/wtm-clients';
import { ClientActions } from '../actions/index';
import { Client } from '../models/client';
import {AppState} from "../reducers/index";


@Injectable()
export class ClientEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private wtmClientsService: WtmClientsService,
    private db: Database,
    private clientActions: ClientActions
  ) { }

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */
  @Effect() openDB$ = this.db.open('wtm_app').filter(() => false);


  @Effect() loadCollectionOnInit$ = Observable.of(this.clientActions.loadCollection());


  @Effect() loadCollection$ = this.updates$
    .whenAction(ClientActions.LOAD_COLLECTION)
    .switchMapTo(this.db.query('books').toArray())
    .map((clients: Client[]) => this.clientActions.loadCollectionSuccess(clients));


  @Effect() search$ = this.updates$
    .whenAction(ClientActions.SEARCH)
    .map<string>(toPayload)
    .filter(query => query !== '')
    .switchMap(query => this.wtmClientsService.searchClients(query)
      .map(clients => this.clientActions.searchComplete(clients))
      .catch(() => Observable.of(this.clientActions.searchComplete([])))
    );


  @Effect() clearSearch$ = this.updates$
    .whenAction(ClientActions.SEARCH)
    .map<string>(toPayload)
    .filter(query => query === '')
    .mapTo(this.clientActions.searchComplete([]));


  @Effect() addClientsToCollection$ = this.updates$
    .whenAction(ClientActions.ADD_TO_COLLECTION)
    .map<Client>(toPayload)
    .mergeMap(client => this.db.insert('books', [ client ])
      .mapTo(this.clientActions.addToCollectionSuccess(client))
      .catch(() => Observable.of(
        this.clientActions.addToCollectionFail(client)
      ))
    );


  @Effect() removeClientFromCollection$ = this.updates$
    .whenAction(ClientActions.REMOVE_FROM_COLLECTION)
    .map<Client>(toPayload)
    .mergeMap(client => this.db.executeWrite('books', 'delete', [ client.NOME ])
      .mapTo(this.clientActions.removeFromCollectionSuccess(client))
      .catch(() => Observable.of(
        this.clientActions.removeFromCollectionFail(client)
      ))
    );
}

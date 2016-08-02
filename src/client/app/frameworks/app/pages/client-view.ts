import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getClient, isClientInCollection } from '../reducers/index';
import { ClientActions } from '../actions/client';
import {
  ClientDetailComponent,
  ClientInput,
  InCollectionInput,
  AddOutput,
  RemoveOutput
} from '../../../components/clientSearch/client-detail';


@Component({
  selector: 'client-view-page',
  directives: [ ClientDetailComponent ],
  template: `
    <sd-client-detail
      [client]="client$ | async"
      [inCollection]="isClientInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </sd-client-detail>
  `
})
export class ClientViewPage {
  client$: Observable<ClientInput>;
  isClientInCollection$: Observable<InCollectionInput>;

  constructor(
    private store: Store<AppState>,
    private clientActions: ClientActions,
    private route: ActivatedRoute
  ) {
    this.client$ = route
      .params
      .select<string>('id')
      .switchMap(id => store.let(getClient(id)));

    this.isClientInCollection$ = route
      .params
      .select<string>('id')
      .switchMap(id => store.let(isClientInCollection(id)));
  }

  addToCollection(client: AddOutput) {
    this.store.dispatch(this.clientActions.addToCollection(client));
  }

  removeFromCollection(client: RemoveOutput) {
    this.store.dispatch(this.clientActions.removeFromCollection(client));
  }
}

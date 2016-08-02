import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ClientActions } from '../actions/client';
import { Client } from '../models/client';


export interface CollectionState {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: CollectionState = {
  loaded: false,
  loading: false,
  ids: []
};

export default function(state = initialState, action: Action): CollectionState {
  switch (action.type) {
    case ClientActions.LOAD_COLLECTION: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case ClientActions.LOAD_COLLECTION_SUCCESS: {
      const clients: Client[] = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: clients.map(client => client.CODIGOCLIENTE)
      };
    }

    case ClientActions.ADD_TO_COLLECTION_SUCCESS:
    case ClientActions.REMOVE_FROM_COLLECTION_FAIL: {
      const client: Client = action.payload;

      if (state.ids.includes(client.CODIGOCLIENTE)) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, client.CODIGOCLIENTE ]
      });
    }

    case ClientActions.REMOVE_FROM_COLLECTION_SUCCESS:
    case ClientActions.ADD_TO_COLLECTION_FAIL: {
      const client: Client = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== client.CODIGOCLIENTE)
      });
    }

    default: {
      return state;
    }
  }
}


export function getLoaded() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.loaded);
}

export function getLoading() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.loading);
}

export function getClientIds() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.ids);
}

export function isClientInCollection(id: string) {
  return (state$: Observable<CollectionState>) => state$
    .let(getClientIds())
    .map(ids => ids.includes(id));
}

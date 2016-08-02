import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Client } from '../models/client';
import { ClientActions } from '../actions/client';


export interface SearchState {
  ids: string[];
  loading: boolean;
  query: string;
}

const initialState: SearchState = {
  ids: [],
  loading: false,
  query: ''
};

export default function(state = initialState, action: Action): SearchState {
  switch (action.type) {
    case ClientActions.SEARCH: {
      const query = action.payload;

      return Object.assign(state, {
        query,
        loading: true
      });
    }

    case ClientActions.SEARCH_COMPLETE: {
      const clients: Client[] = action.payload;

      return {
        ids: clients.map(client => client.CODIGOCLIENTE),
        loading: false,
        query: state.query
      };
    }

    default: {
      return state;
    }
  }
}

export function getStatus() {
  return (state$: Observable<SearchState>) => state$
    .select(s => s.loading);
}

export function getClientIds() {
  return (state$: Observable<SearchState>) => state$
    .select(s => s.ids);
}

export function getQuery() {
  return (state$: Observable<SearchState>) => state$
    .select(s => s.query);
}

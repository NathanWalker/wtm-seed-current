import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Client } from '../models';
import { ClientActions } from '../actions/index';


export interface ClientsState {
  ids: string[];
  entities: { [id: string]: Client };
}

const initialState: ClientsState = {
  ids: [],
  entities: {}
};

export default function(state = initialState, action: Action): ClientsState {
  switch (action.type) {
    case ClientActions.SEARCH_COMPLETE:
    case ClientActions.LOAD_COLLECTION_SUCCESS: {
      const clients: Client[] = action.payload;
      const newClients = clients.filter(client => !state.entities[client.CODIGOCLIENTE]);

      const newClientIds = newClients.map(client => client.CODIGOCLIENTE);
      const newClientEntities = newClients.reduce((entities: { [id: string]: Client }, client: Client) => {
        return Object.assign(entities, {
          [client.CODIGOCLIENTE]: client
        });
      }, {});

      return {
        ids: [ ...state.ids, ...newClientIds ],
        entities: Object.assign({}, state.entities, newClientEntities)
      };
    }

    case ClientActions.LOAD_CLIENT: {
      const client: Client = action.payload;

      if (state.ids.includes(client.CODIGOCLIENTE)) {
        return state;
      }

      return {
        ids: [ ...state.ids, client.CODIGOCLIENTE ],
        entities: Object.assign({}, state.entities, {
          [client.CODIGOCLIENTE]: client
        })
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */
export function getClientEntities() {
  return (state$: Observable<ClientsState>) => state$
    .select(s => s.entities);
}

export function getClient(id: string) {
  return (state$: Observable<ClientsState>) => state$
    .select(s => s.entities[id]);
}

export function getClients(clientIds: string[]) {
  return (state$: Observable<ClientsState>) => state$
    .let(getClientEntities())
    .map(entities => clientIds.map(id => entities[id]));
}

export function hasClient(id: string) {
  return (state$: Observable<ClientsState>) => state$
    .select(s => s.ids.includes(id));
}

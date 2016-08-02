import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Client } from '../models/client';


/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriate action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class ClientActions {
  static SEARCH = '[Client] Search';
  search(query: string): Action {
    return {
      type: ClientActions.SEARCH,
      payload: query
    };
  }

  static SEARCH_COMPLETE = '[Client] Search Complete';
  searchComplete(results: Client[]): Action {
    return {
      type: ClientActions.SEARCH_COMPLETE,
      payload: results
    };
  }

  static ADD_TO_COLLECTION = '[Client] Add to Collection';
  addToCollection(client: Client): Action {
    return {
      type: ClientActions.ADD_TO_COLLECTION,
      payload: client
    };
  }

  static ADD_TO_COLLECTION_SUCCESS = '[Client] Add to Collection Success';
  addToCollectionSuccess(client: Client): Action {
    return {
      type: ClientActions.ADD_TO_COLLECTION_SUCCESS,
      payload: client
    };
  }

  static ADD_TO_COLLECTION_FAIL = '[Client] Add to Collection Fail';
  addToCollectionFail(client: Client): Action {
    return {
      type: ClientActions.ADD_TO_COLLECTION_FAIL,
      payload: client
    };
  }

  static REMOVE_FROM_COLLECTION = '[Client] Remove from Collection';
  removeFromCollection(client: Client): Action {
    return {
      type: ClientActions.REMOVE_FROM_COLLECTION,
      payload: client
    };
  }

  static REMOVE_FROM_COLLECTION_SUCCESS = '[Client] Remove From Collection Success';
  removeFromCollectionSuccess(client: Client): Action {
    return {
      type: ClientActions.REMOVE_FROM_COLLECTION_SUCCESS,
      payload: client
    };
  }

  static REMOVE_FROM_COLLECTION_FAIL = '[Client] Remove From Collection Fail';
  removeFromCollectionFail(client: Client): Action {
    return {
      type: ClientActions.REMOVE_FROM_COLLECTION_FAIL,
      payload: client
    };
  }

  static LOAD_COLLECTION = '[Client] Load Collection';
  loadCollection(): Action {
    return {
      type: ClientActions.LOAD_COLLECTION
    };
  }

  static LOAD_COLLECTION_SUCCESS = '[Client] Load Collection Success';
  loadCollectionSuccess(clients: Client[]): Action {
    return {
      type: ClientActions.LOAD_COLLECTION_SUCCESS,
      payload: clients
    };
  }

  static LOAD_CLIENT = '[Client] Load Client';
  loadClient(client: Client): Action {
    return {
      type: ClientActions.LOAD_CLIENT,
      payload: client
    };
  }
}

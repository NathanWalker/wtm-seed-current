import { DBSchema } from '@ngrx/db';


/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
const schema: DBSchema = {
  version: 1,
  name: 'books_app',
  stores: {
    clients: {
      autoIncrement: true,
      primaryKey: 'CODIGOCLIENTE'
    }
  }
};


export default schema;

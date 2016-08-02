import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Client} from '../models/client';

@Injectable()
export class WtmClientsService {
    private API_PATH:string = 'http://localhost:3000';

    constructor(private http:Http) {
    }

    searchClients(queryTitle:string):Observable<Client[]> {
        return this.http.get(`${this.API_PATH}/wtm/all/0/25/?q=${queryTitle}`)
            .map(res => {
                console.log(res.json());
                return res.json().items;
            });
    }

    retrieveClient(volumeId:string):Observable<Client> {
        return this.http.get(`${this.API_PATH}/clients/${volumeId}`)
            .map(res => {
                console.log(res.json());
                return res.json()
            });
    }
}

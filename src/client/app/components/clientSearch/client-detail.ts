import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Client} from '../../frameworks/app/models/client';

/**
 * Tip: Export type aliases for your component's inputs and outputs. Until we
 * get better tooling for templates, this helps enforce you are using a
 * component's API with type safety.
 */
export type ClientInput = Client;
export type InCollectionInput = boolean;
export type AddOutput = Client;
export type RemoveOutput = Client;

@Component({
    selector: 'sd-client-detail',
    template: `
    <md-card>
      <md-card-title-group>
        <md-card-title>{{ title }}</md-card-title>
        <md-card-subtitle *ngIf="subtitle">{{ subtitle }}</md-card-subtitle>
        <img md-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
      </md-card-title-group>
      <md-card-content>
        <p [innerHtml]="description"></p>
      </md-card-content>
      <md-card-footer>
        <h5 md-subheader>Written By:</h5>
      </md-card-footer>
      <md-card-actions align="end">
        <button md-raised-button color="warn" *ngIf="inCollection" (click)="remove.emit(client)">
        Remove Book from Collection
        </button>

        <button md-raised-button color="primary" *ngIf="!inCollection" (click)="add.emit(client)">
        Add Book to Collection
        </button>
      </md-card-actions>
    </md-card>

  `,
    styles: [`
    :host {
      display: flex;
      justify-content: center;
      margin: 75px 0;
    }
    md-card {
      max-width: 600px;
    }
    md-card-title {
      margin-left: 10px;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    md-card-content {
      margin-top: 15px;
      margin-bottom: 125px;
    }
    md-card-footer {
      padding-bottom: 75px;
    }
  `]
})
export class ClientDetailComponent {
    /**
     * Dumb components receieve data through @Input() and communicate events
     * through @Output() but generally maintain no internal state of their
     * own. All decisions are delegated to 'container', or 'smart'
     * components before data updates flow back down.
     *
     * More on 'smart' and 'dumb' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
     *
     * Tip: Utilize getters to keep templates clean in 'dumb' components.
     */
    @Input() client:ClientInput;
    @Input() inCollection:InCollectionInput;
    @Output() add = new EventEmitter<AddOutput>();
    @Output() remove = new EventEmitter<RemoveOutput>();

    get id() {
        console.log('++++++' + this.client.CODIGOCLIENTE);
        return this.client.CODIGOCLIENTE;
    }

    get title() {
        return this.client.NOME;
    }

    get subtitle() {
        return this.client.BAIRRO;
    }

    get description() {
        return this.client.CNPJ;
    }


    get authors() {
      return this.client.CODIGO;
    }

    // get thumbnail() {
    //   return this.client.volumeInfo.imageLinks.smallThumbnail;
    // }
}

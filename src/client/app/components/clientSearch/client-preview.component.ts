/**
 * Created by benevideschissanga on 27/07/16.
 */
import {Input } from '@angular/core';
import { Client } from '../../frameworks/app/models/client';
export type ClientInput = Client;
import {RemoveHost} from "../../frameworks/core/directives/removeHost-directive";
import {BaseComponent} from "../../frameworks/core/index";
@BaseComponent({
    moduleId: module.id,
    selector:'sd-clientPreview',
    templateUrl: 'client-preview.component.html',
    styleUrls: ['client-preview.component.css'],
    directives:[RemoveHost]
})
export class ClientPreviewComponent{
    @Input() client: ClientInput;

    get id() {
        return this.client.CODIGOCLIENTE;
    }

    get title() {
        return this.client.CODIGO;
    }
    //
    get subtitle() {
        return this.client.NOME;
    }

    get description() {
        return this.client.FANTASIA;
    }
    //
    // get authors() {
    //   return this.client.volumeInfo.authors;
    // }
    //
    // get thumbnail(): string | boolean {
    //   if (this.client.volumeInfo.imageLinks) {
    //     return this.client.volumeInfo.imageLinks.smallThumbnail;
    //   }
    //
    //   return false;
    // }
}

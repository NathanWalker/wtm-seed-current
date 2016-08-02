import {Input} from '@angular/core';
import {ClientPreviewComponent, ClientInput} from "./client-preview.component";
import {BaseComponent} from "../../frameworks/core/index";

export type ClientsInput = ClientInput[];

@BaseComponent({
  selector: 'client-preview-list',
  directives: [ ClientPreviewComponent ],
  template: `
    <sd-clientPreview *ngFor="let client of clients" [client]="client"></sd-clientPreview>
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class ClientPreviewListComponent{
  @Input() clients: ClientInput;
    constructor(){

    }
}

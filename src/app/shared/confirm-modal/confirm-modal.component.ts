import { DialogService } from 'ng2-bootstrap-modal';
import { DialogComponent } from 'ng2-bootstrap-modal';
import { Component } from '@angular/core';

export interface ConfirmInterface {
   titulo: string;
   descripcion: string;
}

@Component({
   selector: 'app-confirm-modal',
   templateUrl: 'confirm-modal.component.html'
})

export class ConfirmModalComponent extends DialogComponent<ConfirmInterface, boolean> implements ConfirmInterface {
   titulo: string;
   descripcion: string;
   public response: boolean;

   constructor( dialogService: DialogService ) {
       super( dialogService );
       this.response = false;
   }

   confirm() {
       this.result = true;
       this.close();
   }

}
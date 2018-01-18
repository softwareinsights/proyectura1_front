import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ReferenciasService } from './../referencias.service';
import { ReferenciasInterface } from './../referencias.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./referencias-edit-modal.component.scss')],
  templateUrl: './referencias-edit-modal.component.html'
})
export class ReferenciasEditModalComponent extends DialogComponent<ReferenciasInterface, any> implements OnInit, ReferenciasInterface {

  idreferencia: number;
  referencia: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  idreferenciaAC: AbstractControl;
  referenciaAC: AbstractControl;
  constructor(
      private service: ReferenciasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idreferenciaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'referenciaAC' : ['',Validators.compose([Validators.maxLength(45)])],
  });
  this.idreferenciaAC = this.form.controls['idreferenciaAC'];
  this.referenciaAC = this.form.controls['referenciaAC'];
  }
  ngOnInit() {
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: ReferenciasInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idreferencia: this.idreferencia,
                  referencia: this.referencia,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}

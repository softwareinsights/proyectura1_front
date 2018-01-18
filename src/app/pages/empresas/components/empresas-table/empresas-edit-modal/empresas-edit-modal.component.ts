import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EmpresasService } from './../empresas.service';
import { EmpresasInterface } from './../empresas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./empresas-edit-modal.component.scss')],
  templateUrl: './empresas-edit-modal.component.html'
})
export class EmpresasEditModalComponent extends DialogComponent<EmpresasInterface, any> implements OnInit, EmpresasInterface {

  idempresa: number;
  nombre: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  idempresaAC: AbstractControl;
  nombreAC: AbstractControl;
  constructor(
      private service: EmpresasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idempresaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'nombreAC' : ['',Validators.compose([Validators.maxLength(60)])],
  });
  this.idempresaAC = this.form.controls['idempresaAC'];
  this.nombreAC = this.form.controls['nombreAC'];
  }
  ngOnInit() {
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: EmpresasInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idempresa: this.idempresa,
                  nombre: this.nombre,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}

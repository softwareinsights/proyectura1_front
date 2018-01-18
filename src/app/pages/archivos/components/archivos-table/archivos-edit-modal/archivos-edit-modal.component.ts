import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ArchivosService } from './../archivos.service';
import { ArchivosInterface } from './../archivos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReferenciasService } from './../../../../referencias/components/referencias-table/referencias.service';
import { ReferenciasAddModalComponent } from './../../../../referencias/components/referencias-table/referencias-add-modal/referencias-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./archivos-edit-modal.component.scss')],
  templateUrl: './archivos-edit-modal.component.html'
})
export class ArchivosEditModalComponent extends DialogComponent<ArchivosInterface, any> implements OnInit, ArchivosInterface {
  _referencia: string[] = [];

  idarchivo: number;
  proceso: string;
  tipoarchivo: string;
  urlarchivo: string;
  idreferencia: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  procesoAC: AbstractControl;
  tipoarchivoAC: AbstractControl;
  urlarchivoAC: AbstractControl;
  idreferenciaAC: AbstractControl;
  constructor(
      private service: ArchivosService,
      private referenciasService: ReferenciasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'procesoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'tipoarchivoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'urlarchivoAC' : ['',Validators.compose([Validators.maxLength(80)])],
    'idreferenciaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.procesoAC = this.form.controls['procesoAC'];
  this.tipoarchivoAC = this.form.controls['tipoarchivoAC'];
  this.urlarchivoAC = this.form.controls['urlarchivoAC'];
  this.idreferenciaAC = this.form.controls['idreferenciaAC'];
  }
  ngOnInit() {
      this.getReferencia();
  }

  referenciaAddModalShow() {
      const disposable = this.dialogService.addDialog(ReferenciasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.referenciaShowToast(data);
          }
      })
  }

  referenciaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getReferencia();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getReferencia() {
      this.referenciasService.all()
      .subscribe(
          (data: any) => this._referencia = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: ArchivosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idarchivo: this.idarchivo,
                  proceso: this.proceso,
                  tipoarchivo: this.tipoarchivo,
                  urlarchivo: this.urlarchivo,
                  idreferencia: this.idreferencia,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}

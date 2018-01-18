import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisosService } from './../permisos.service';
import { PermisosInterface } from './../permisos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./permisos-add-modal.component.scss')],
  templateUrl: './permisos-add-modal.component.html'
})
export class PermisosAddModalComponent extends DialogComponent<PermisosInterface, any> implements OnInit {

  idpermiso: number;
  nombre: string;
  permiso: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  idpermisoAC: AbstractControl;
  nombreAC: AbstractControl;
  permisoAC: AbstractControl;

  constructor(
    private service: PermisosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'idpermisoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'nombreAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'permisoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    });
    this.idpermisoAC = this.form.controls['idpermisoAC'];
    this.nombreAC = this.form.controls['nombreAC'];
    this.permisoAC = this.form.controls['permisoAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: PermisosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  idpermiso: this.idpermiso,
                  nombre: this.nombre,
                  permiso: this.permiso,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
